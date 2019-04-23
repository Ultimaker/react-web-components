import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

// components
import Button from './button';
import ProfileImage from './profile_image';
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
    /** A label to be shown in the navigation bar */
    navLabel?: string;
    /** The username of the user to be shown in the mobile menu */
    accountDisplayName?: string;
    /** The URL to the user's account page */
    accountImageURL?: string;
    /** Used to toggle the visibility of the mobile navigation menu */
    showMobileMenu?: boolean;
    /** Called when the mobile navigation is closed */
    onCloseMobileMenuHandler?: () => void;
}

export interface NavigationState {
    showAccountNav: boolean;
}

export class Navigation extends React.Component<NavigationProps, NavigationState> {
    state = {
        showAccountNav: false,
    }

    private _onCloseMobileMenuHandler(): void {
        const { onCloseMobileMenuHandler } = this.props;

        if (onCloseMobileMenuHandler) {
            onCloseMobileMenuHandler();
        }
    }

    private _toggleShowAccountNav(showAccountNav: boolean): void {
        this.setState({
            showAccountNav,
        });
    }

    private _renderMobileMenu(): JSX.Element {
        const {
            onSignOutClickHandler, manageAccountURL,
            accountNavText, signOutNavText, accountImageURL, accountDisplayName,
        } = this.props;
        const { showAccountNav } = this.state;

        return (
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
                                <a href={manageAccountURL} className="navigation__nav-link" target="_blank" rel="noopener noreferrer">
                                    <span className="label">{accountNavText}</span>
                                </a>
                            </li>
                        )}

                        {onSignOutClickHandler && (
                            <li>
                                <Button className="navigation__nav-link" onClickHandler={onSignOutClickHandler} appearance="no-style">
                                    <span className="label">{signOutNavText}</span>
                                </Button>
                            </li>
                        )}
                    </ul>
                </SlideOutContainer>
            </div>
        );
    }

    render(): JSX.Element {
        const {
            navLinks, showMobileMenu, navLabel,
        } = this.props;

        const navClasses = classNames('navigation', { 'navigation--open': showMobileMenu });
        const visibleNavLinks = navLinks.filter(navLink => navLink.visible);

        return (
            <div className={navClasses}>
                <div className="layout layout--gutter-none layout--align-middle">

                    <div className="layout__item u-fit-sm">
                        <nav className="navigation__container" role="navigation">

                            {this._renderMobileMenu()}

                            <ul className="navigation__nav-list">
                                {visibleNavLinks.map(navLink => (
                                    <li key={navLink.path}>
                                        <NavLink
                                            to={navLink.path}
                                            activeClassName="active"
                                            className="navigation__nav-link"
                                            onClick={() => this._onCloseMobileMenuHandler()}
                                        >
                                            <span className="label">{navLink.label}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                        </nav>
                    </div>

                    {navLabel && (
                        <div className="layout__item layout__item--right u-fit show-sm">
                            <div className="navigation__label">
                                {navLabel}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Navigation;
