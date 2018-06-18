// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';

export interface HeaderProps {
  showNav?: boolean;
  headerLogo?: JSX.Element;
  rightSideLabel?: string;
}

const Header: React.StatelessComponent<HeaderProps> = ({ showNav, headerLogo, rightSideLabel, children }) => {
    return (
        <header className="app__header">
            <Link className="logo" to="/">
                {headerLogo}
            </Link>
            <div className="navigation-container">
                {showNav && children}
                { rightSideLabel && <div className="right-side-label hide-sm">
                    <span title={rightSideLabel}>{rightSideLabel}</span>
                </div> }
            </div>
        </header>
    );

}

Header.defaultProps = {
    showNav: true,
    headerLogo: <Logo/>
}

export default Header;
