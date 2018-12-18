import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Motion, spring } from 'react-motion';

// components
import Button from './button';

// utils
import { I18n } from '../utils/i18n';

export interface NavRoute {
    path: string;
    label: string;
    visible: boolean;
    component: React.ComponentClass | React.StatelessComponent;
    scopes?: string[];
    props?: object;
}

export interface NavigationProps {
    navLinks: NavRoute[];
    manageAccountURL?: string;
    onSignOutClickHandler?: () => void;
}

export interface NavigationState {
    showNav: boolean;
}

const motion = { stiffness: 999, damping: 50 };

export default class Navigation extends React.Component<NavigationProps, NavigationState> {
    state = {
        showNav: false,
    }

    private _toggleShowNav(showNav: boolean): void {
        if (showNav) {
            document.body.classList.add('noscroll');
        } else {
            document.body.classList.remove('noscroll');
        }

        this.setState({
            showNav,
        });
    }

    render(): JSX.Element {
        const {
            navLinks, onSignOutClickHandler, manageAccountURL, children,
        } = this.props;
        const { showNav } = this.state;

        const burgerIconClasses = classNames('burger-menu__icon', { open: showNav });
        const navClasses = classNames('navigation', { open: showNav });
        const visibleNavLinks = navLinks.filter(navLink => navLink.visible);

        return (
            <nav className={navClasses} role="navigation">

                {visibleNavLinks.length > 0 && (
                    <div className="nav-links-container">
                        <div className="burger-menu hide-sm">
                            <Button
                                style="primary"
                                shape="circle"
                                onClickHandler={() => this._toggleShowNav(!showNav)}
                            >
                                <div className={burgerIconClasses} />
                            </Button>
                        </div>

                        <Motion style={{ x: spring(showNav ? 56 : 0, motion) }}>
                            {({ x }) => (
                                <ul>
                                    {visibleNavLinks.map((navLink, index) => (
                                        <li key={navLink.path} style={{ top: `${(index + 1) * x}px` }}>
                                            <NavLink
                                                to={navLink.path}
                                                activeClassName="active"
                                                className="nav-link"
                                                onClick={() => this._toggleShowNav(false)}
                                            >
                                                <span className="label">{navLink.label}</span>
                                            </NavLink>
                                        </li>
                                    ))}

                                    {manageAccountURL && (
                                        <li style={{ top: `${(visibleNavLinks.length + 1) * x}px` }} className="hide-sm">
                                            <a href={manageAccountURL} className="nav-link" target="_blank" rel="noopener noreferrer">
                                                <span className="label">{I18n.translate('Nav manage account button', 'Account')}</span>
                                            </a>
                                        </li>
                                    )}

                                    {onSignOutClickHandler && (
                                        <li style={{ top: `${(visibleNavLinks.length + (manageAccountURL ? 2 : 1)) * x}px` }} className="hide-sm">
                                            <Button className="nav-link" onClickHandler={onSignOutClickHandler} style="no-style">
                                                <span className="label">{I18n.translate('Nav sign out button', 'Sign out')}</span>
                                            </Button>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </Motion>

                        {children && (
                            <div className="children-containter">
                                {children}
                            </div>
                        )}

                    </div>
                )}

            </nav>
        );
    }
}
