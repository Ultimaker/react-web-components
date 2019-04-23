import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

// components
import Button from './button';
import ProfileImage from './profile_image';
import PanelArrow from './panel_arrow';
import SlideOutContainer from './slide_out_container';

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

    accountImageURL?: string
}

export interface NavigationState {
    showNav: boolean;
    showAccountNav: boolean;
}

export class Navigation extends React.Component<NavigationProps, NavigationState> {
    state = {
        showNav: true,
        showAccountNav: false,
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

    private _toggleShowAccountNav(showAccountNav: boolean): void {
        this.setState({
            showAccountNav,
        });
    }

    render(): JSX.Element {
        const {
            navLinks, onSignOutClickHandler, manageAccountURL,
            accountNavText, signOutNavText, navLabel, accountImageURL, accountDisplayName,
        } = this.props;
        const { showNav, showAccountNav } = this.state;

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

                            <div className="navigation__account hide-sm">
                                <SlideOutContainer
                                    isOpen={showAccountNav}
                                    panelArrowWidth="1.2rem"
                                    headerText={(
                                        <div className="layout layout--align-middle">
                                            <div className="layout__item u-fit">
                                                <ProfileImage imageURL={accountImageURL} size="3.6rem" />
                                            </div>
                                            <div className="layout__item u-fill">
                                                <div className="navigation__account-name truncate">{accountDisplayName}</div>
                                            </div>
                                        </div>
                                    )}
                                    onHeaderClick={
                                        () => this._toggleShowAccountNav(!showAccountNav)
                                    }
                                >
                                    <ul className="navigation__account-options">
                                        {manageAccountURL && (
                                            <li>
                                                <a href={manageAccountURL} className="nav-link" target="_blank" rel="noopener noreferrer">
                                                    <span className="label">{accountNavText}</span>
                                                </a>
                                            </li>
                                        )}

                                        {onSignOutClickHandler && (
                                            <li>
                                                <Button className="nav-link" onClickHandler={onSignOutClickHandler} appearance="no-style">
                                                    <span className="label">{signOutNavText}</span>
                                                </Button>
                                            </li>
                                        )}
                                    </ul>
                                </SlideOutContainer>
                            </div>


                            {/* <div className="burger-menu hide-sm">
                                <Button
                                    appearance="primary"
                                    shape="circle"
                                    onClickHandler={() => this._toggleShowNav(!showNav)}
                                >
                                    <div className={burgerIconClasses} />
                                </Button>
                            </div> */}

                            <ul className="navigation__nav-list">
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
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
