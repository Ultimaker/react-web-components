import * as React from 'react';
import classNames from 'classnames';

// components
import NavigationDesktop from './navigation_desktop';
import NavigationMobile from './navigation_mobile';

export interface SubNavRoute {
    path: string;
    label: string;
}

export interface NavRoute {
    path: string;
    label: string;
    visible: boolean;
    subRoutes?: SubNavRoute[];
}

export interface NavigationProps {
    /** Details for the nav items */
    navLinks: NavRoute[];
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
    /** A label to be shown in the navigation bar */
    navLabel?: string;
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

export const Navigation: React.StatelessComponent<NavigationProps> = ({
    navLinks, navLabel, manageAccountURL, onSignOutClickHandler,
    onSignInClickHandler, accountButtonText, signOutButtonText, signInButtonText,
    accountDisplayName, accountImageURL, signedOut, showMobileMenu,
    onCloseMobileMenuHandler, showMobileAccountNav,
}) => {
    const navClasses = classNames('navigation', { 'navigation--open': showMobileMenu });
    const visibleNavLinks = navLinks.filter((navLink) => navLink.visible);

    return (
        <div className={navClasses}>
            {(visibleNavLinks.length > 0 || navLabel) && (
                <NavigationDesktop
                    visibleNavLinks={visibleNavLinks}
                    navLabel={navLabel}
                />
            )}

            <NavigationMobile
                visibleNavLinks={visibleNavLinks}
                manageAccountURL={manageAccountURL}
                onSignOutClickHandler={onSignOutClickHandler}
                onSignInClickHandler={onSignInClickHandler}
                accountButtonText={accountButtonText}
                signOutButtonText={signOutButtonText}
                signInButtonText={signInButtonText}
                accountDisplayName={accountDisplayName}
                accountImageURL={accountImageURL}
                signedOut={signedOut}
                showMobileMenu={showMobileMenu}
                onCloseMobileMenuHandler={onCloseMobileMenuHandler}
                showMobileAccountNav={showMobileAccountNav}
            />
        </div>
    );
};

Navigation.displayName = 'Navigation';

export default Navigation;
