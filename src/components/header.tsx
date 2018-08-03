// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Link } from 'react-router-dom';
import CuraLogo from './icons/cura_logo';

export interface HeaderProps {
  showNav?: boolean;
  headerLogo?: JSX.Element;
  headerLogoUrl?: string;
  rightSideLabel?: string;
}

const Header: React.StatelessComponent<HeaderProps> = ({ showNav, headerLogo, headerLogoUrl, rightSideLabel, children }) => {
  return (
    <header className="app__header">
      <Link className="logo" to={headerLogoUrl}>
        {headerLogo}
      </Link>
      <div className="navigation-container">
        {showNav && children}
        {rightSideLabel && <div className="right-side-label hide-sm">
          <span title={rightSideLabel}>{rightSideLabel}</span>
        </div>}
      </div>
    </header>
  );

}

Header.defaultProps = {
  showNav: true,
  headerLogo:<CuraLogo />,
  headerLogoUrl: "/"
}

export default Header;
