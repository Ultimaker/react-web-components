import * as React from 'react';
import { NavLink } from 'react-router-dom';

// components
import Button from './button';
import ProfileImage from './profile_image';
import SlideOutContainer from './slide_out_container';
import SlideInPanel from './slide_in_panel';
import SubNavigationMobileMenu from './sub_navigation_mobile_menu';

// components
import { NavRoute } from './Navigation';

export interface NavigationMobileProps {
    /** Details for the visible nav items */
    visibleNavLinks: NavRoute[];
    /** URL for the account portal */
    manageAccountURL?: string;
    /** Called when sign out is clicked */
    onSignOutClickHandler?: () => void;
    /** Called when the sign in button is clicked */
    onSignInClickHandler?: () => void;
    /** The label for account navigation on mobile */
    accountButtonText?: string;
    /** The label for sign out on mobile */
    signOutButtonText?: string;
    /** The label for sign in */
    signInButtonText?: string;
    /** The username of the user to be shown in the mobile menu */
    accountDisplayName?: string;
    /** The URL to the user's account page */
    accountImageURL?: string;
    /** Whether the user is signed out */
    signedOut?: boolean;
    /**
     * Used to toggle the visibility of the mobile navigation menu.
     * Passed in by the header component.
     */
    showMobileMenu?: boolean;
    /**
     * Called when the mobile navigation is closed.
     * Passed in by the header component.
     */
    onCloseMobileMenuHandler?: () => void;
    /** Whether the user profile should be displayed in the mobile menu */
    showMobileAccountNav?: boolean;
}

export class NavigationMobile extends React.Component<NavigationMobileProps, {}> {
    constructor(props) {
        super(props);

        this._onCloseMobileMenuHandler = this._onCloseMobileMenuHandler.bind(this);
    }

    private _onCloseMobileMenuHandler(): void {
        const { onCloseMobileMenuHandler } = this.props;

        if (onCloseMobileMenuHandler) {
            onCloseMobileMenuHandler();
        }
    }

    private _renderAccountNav(): JSX.Element {
        const {
            onSignOutClickHandler, onSignInClickHandler, manageAccountURL, signInButtonText,
            signedOut, accountButtonText, signOutButtonText, accountImageURL, accountDisplayName,
        } = this.props;

        return (
            <div className="navigation__account">
                {signedOut && (
                    <Button
                        appearance="secondary"
                        className="navigation__account-sign-in-btn"
                        onClickHandler={onSignInClickHandler}
                    >
                        {signInButtonText}
                    </Button>
                )}
                {!signedOut && (
                    <SubNavigationMobileMenu
                        menuLabel={(
                            <div className="layout layout--align-middle">
                                <div className="layout__item u-fit">
                                    <ProfileImage imageURL={accountImageURL} size="3.6rem" />
                                </div>
                                <div className="layout__item u-fill">
                                    <div className="navigation__account-name truncate">{accountDisplayName}</div>
                                </div>
                            </div>
                        )}
                    >
                        <ul className="sub-navigation-mobile-menu__options drop-down-menu-base__menu-list">
                            {manageAccountURL && (
                                <li>
                                    <a href={manageAccountURL} className="drop-down-menu-base__item">
                                        <span className="label">{accountButtonText}</span>
                                    </a>
                                </li>
                            )}

                            {onSignOutClickHandler && (
                                <li>
                                    <Button className="drop-down-menu-base__item" onClickHandler={onSignOutClickHandler} appearance="no-style">
                                        <span className="label">{signOutButtonText}</span>
                                    </Button>
                                </li>
                            )}
                        </ul>
                    </SubNavigationMobileMenu>
                )}
            </div>
        );
    }

    private _renderNavLinks(): JSX.Element {
        const { visibleNavLinks } = this.props;

        return (
            <ul className="drop-down-menu-base__menu-list">
                {visibleNavLinks.map(navLink => (
                    <li key={navLink.path}>
                        {!navLink.subRoutes && (
                            <NavLink
                                to={navLink.path}
                                activeClassName="active"
                                className="drop-down-menu-base__item"
                                onClick={this._onCloseMobileMenuHandler}
                            >
                                <span className="label">{navLink.label}</span>
                            </NavLink>
                        )}
                        {navLink.subRoutes && (
                            <SubNavigationMobileMenu
                                menuLabel={navLink.label}
                            >
                                <ul className="sub-navigation-mobile-menu__options drop-down-menu-base__menu-list">
                                    {navLink.subRoutes && navLink.subRoutes.map(subNavItem => (
                                        <li key={subNavItem.path}>
                                            <NavLink
                                                key={subNavItem.path}
                                                to={subNavItem.path}
                                                activeClassName="active"
                                                className="drop-down-menu-base__item"
                                                onClick={this._onCloseMobileMenuHandler}
                                            >
                                                <span className="label">{subNavItem.label}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </SubNavigationMobileMenu>
                        )}
                    </li>

                ))}
            </ul>
        );
    }

    render(): JSX.Element {
        const { showMobileMenu, showMobileAccountNav } = this.props;

        return (
            <div className="navigation__mobile hide-sm">
                <SlideInPanel
                    isOpen={showMobileMenu}
                    width="30rem"
                    includeHeader={false}
                    onOverlayClickHandler={this._onCloseMobileMenuHandler}
                    slideDirection="left"
                >
                    <div>
                        {showMobileAccountNav && this._renderAccountNav()}
                        {this._renderNavLinks()}
                    </div>
                </SlideInPanel>
            </div>
        );
    }
}

export default NavigationMobile;
