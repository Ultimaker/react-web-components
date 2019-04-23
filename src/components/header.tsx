// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Link } from 'react-router-dom';
import UltimakerLogo from './icons/ultimaker_logo';

export interface HeaderProps {
    headerLogo?: JSX.Element;
    headerLogoUrl?: string;
    appName?: string;
    userAccountMenu?: JSX.Element;
    showSubNav?: boolean;
    subNavLabel?: string;
    subNavLinks?: JSX.Element;
}

export const Header: React.StatelessComponent<HeaderProps> = ({
    headerLogo,
    headerLogoUrl,
    appName,
    userAccountMenu,
    showSubNav,
    subNavLabel,
    subNavLinks,
}) => (
    <header className="app__header">
        <div className="layout layout--align-middle app__primary-navigation">
            <div className="layout__item u-fill">
                <Link className="app__header__home" to={headerLogoUrl}>
                    <span className="app__header__logo">{headerLogo}</span>
                    <span className="app__header__name">{appName}</span>
                </Link>
            </div>
            {userAccountMenu && (
                <div className="layout__item u-fit">
                    { userAccountMenu }
                </div>
            )}
        </div>

        {showSubNav && (
            <div className="layout layout--gutter-none layout--align-middle app__sub-navigation">
                {subNavLabel && (
                    <div className="layout__item u-fit">
                        <div className="app__sub-navigation__label">
                            {subNavLabel}
                        </div>
                    </div>
                )}
                <div className="layout__item u-fit">
                    {subNavLinks}
                </div>
            </div>
        )}
    </header>
);

Header.defaultProps = {
    headerLogo: <UltimakerLogo />,
    headerLogoUrl: '/',
};

Header.displayName = 'Header';

export default Header;
