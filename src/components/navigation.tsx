import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Spring } from 'react-spring';

// components
import Button from './button';

export interface NavRoute {
    path: string;
    label: string;
    visible: boolean;
}

export interface NavigationProps {
    /** Details for the nav items */
    navLinks: NavRoute[];
    /** URL for the account portal */
    manageAccountURL?: string;
    /** Called when sign out is clicked */
    onSignOutClickHandler?: () => void;
    /** The label for account navigation on mobile */
    accountNavText: string;
    /** The label for sign out on mobile */
    signOutNavText: string;

    navLabel?: string;

    accountDisplayName?: string;

    imageURL?: string
}

export interface NavigationState {
    showNav: boolean;
}

export class Navigation extends React.Component<NavigationProps, NavigationState> {
    state = {
        showNav: true,
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
            navLinks, onSignOutClickHandler, manageAccountURL,
            accountNavText, signOutNavText, navLabel,
        } = this.props;
        const { showNav } = this.state;

        const burgerIconClasses = classNames('burger-menu__icon', { open: showNav });
        const navClasses = classNames('navigation', { open: showNav });
        const visibleNavLinks = navLinks.filter(navLink => navLink.visible);

        return (
            <div className={navClasses}>
                <div className="layout layout--gutter-none layout--align-middle">
                    {navLabel && (
                        <div className="layout__item u-fit show-sm">
                            <div className="navigation__label">
                                {navLabel}
                            </div>
                        </div>
                    )}
                    <div className="layout__item u-fit-sm">
                        <nav className="nav-links-container" role="navigation">


                            {/* <div className="burger-menu hide-sm">
                                <Button
                                    appearance="primary"
                                    shape="circle"
                                    onClickHandler={() => this._toggleShowNav(!showNav)}
                                >
                                    <div className={burgerIconClasses} />
                                </Button>
                            </div> */}

                            <ul>
                                {visibleNavLinks.map((navLink, index) => (
                                    <li key={navLink.path}>
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
                                    <li className="hide-sm">
                                        <a href={manageAccountURL} className="nav-link" target="_blank" rel="noopener noreferrer">
                                            <span className="label">{accountNavText}</span>
                                        </a>
                                    </li>
                                )}

                                {onSignOutClickHandler && (
                                    <li className="hide-sm">
                                        <Button className="nav-link" onClickHandler={onSignOutClickHandler} appearance="no-style">
                                            <span className="label">{signOutNavText}</span>
                                        </Button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
