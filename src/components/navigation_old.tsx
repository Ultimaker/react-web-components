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

export interface NavigationOldProps {
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
}

export interface NavigationOldState {
    showNav: boolean;
}

export class NavigationOld extends React.Component<NavigationOldProps, NavigationOldState> {
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
            navLinks, onSignOutClickHandler, manageAccountURL,
            accountNavText, signOutNavText, children,
        } = this.props;
        const { showNav } = this.state;

        const burgerIconClasses = classNames('burger-menu__icon', { open: showNav });
        const navClasses = classNames('navigation--old', { open: showNav });
        const visibleNavLinks = navLinks.filter(navLink => navLink.visible);

        return (
            <nav className={navClasses} role="navigation">

                <div className="nav-links-container">
                    <div className="burger-menu hide-sm">
                        <Button
                            appearance="primary"
                            shape="circle"
                            onClickHandler={() => this._toggleShowNav(!showNav)}
                        >
                            <div className={burgerIconClasses} />
                        </Button>
                    </div>


                    <Spring
                        config={{ tension: 999, friction: 50 }}
                        from={{ x: 0 }}
                        to={{ x: showNav ? 56 : 0 }}
                    >
                        {(props: any) => (
                            <ul>
                                {visibleNavLinks.map((navLink, index) => (
                                    <li key={navLink.path} style={{ top: `${(index + 1) * props.x}px` }}>
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
                                    <li style={{ top: `${(visibleNavLinks.length + 1) * props.x}px` }} className="hide-sm">
                                        <a href={manageAccountURL} className="nav-link" target="_blank" rel="noopener noreferrer">
                                            <span className="label">{accountNavText}</span>
                                        </a>
                                    </li>
                                )}

                                {onSignOutClickHandler && (
                                    <li style={{ top: `${(visibleNavLinks.length + (manageAccountURL ? 2 : 1)) * props.x}px` }} className="hide-sm">
                                        <Button className="nav-link" onClickHandler={onSignOutClickHandler} appearance="no-style">
                                            <span className="label">{signOutNavText}</span>
                                        </Button>
                                    </li>
                                )}
                            </ul>
                        )}
                    </Spring>


                    {children && (
                        <div className="children-containter">
                            {children}
                        </div>
                    )}

                </div>
            </nav>
        );
    }
}

export default NavigationOld;