// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Link } from 'react-router-dom';
import UltimakerLogo from './icons/ultimaker_logo';

export interface HeaderOldProps {
    showNav?: boolean;
    headerLogo?: JSX.Element;
    headerLogoUrl?: string;
    rightSideLabel?: string;
}

export const HeaderOld: React.StatelessComponent<HeaderOldProps> = ({
    showNav, headerLogo, headerLogoUrl, rightSideLabel, children,
}) => (
    <header className="app__header--old">
        <Link className="logo" to={headerLogoUrl}>
            {headerLogo}
        </Link>
        <div className="navigation-container">
            {showNav && children}
            {rightSideLabel && (
                <div className="right-side-label show-md">
                    <span title={rightSideLabel}>{rightSideLabel}</span>
                </div>
            )}
        </div>
    </header>
);

HeaderOld.defaultProps = {
    showNav: true,
    headerLogo: <UltimakerLogo />,
    headerLogoUrl: '/',
};

HeaderOld.displayName = 'HeaderOld';

export default HeaderOld;
