// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Link } from 'react-router-dom';
import UltimakerLogo from './icons/ultimaker_logo';

export interface HeaderProps {
    headerLogo?: JSX.Element;
    headerLogoUrl?: string;
    appName?: string;
    userAccountMenu?: JSX.Element;
    children?: JSX.Element;
}

export const Header: React.StatelessComponent<HeaderProps> = ({
    headerLogo,
    headerLogoUrl,
    appName,
    userAccountMenu,
    children,
}) => (
    <header className="app__header">
        <div className="layout layout--align-middle app__primary-navigation">
            <div className="layout__item u-fill">
                <Link className="app__header__home" to={headerLogoUrl}>
                    <span className="app__header__logo">{headerLogo}</span>
                    <span className="app__header__name show-sm">{appName}</span>
                </Link>
            </div>
            {userAccountMenu && (
                <div className="layout__item u-fit show-sm">
                    { userAccountMenu }
                </div>
            )}
        </div>
        {children}
    </header>
);

Header.defaultProps = {
    headerLogo: <UltimakerLogo />,
    headerLogoUrl: '/',
};

Header.displayName = 'Header';

export default Header;
