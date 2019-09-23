import * as React from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

// components
import SubNavigationMenu from './sub_navigation_menu';
import SubNavigationMenuItem from './sub_navigation_menu_item';
import { NavRoute } from './navigation';

export interface NavigationDesktopProps extends RouteComponentProps<{}> {
    /** Details for the visible nav items */
    visibleNavLinks: NavRoute[];
    /** A label to be shown in the navigation bar */
    navLabel?: string;
}


export const NavigationDesktop: React.StatelessComponent<NavigationDesktopProps> = ({
    navLabel, visibleNavLinks, location,
}) => (
    <div className="navigation__desktop show-sm layout layout--gutter-none layout--align-middle">
        {visibleNavLinks.length > 0 && (
            <div className="layout__item u-fit-sm">
                <nav className="navigation__container">
                    <ul className="navigation__nav-list">
                        {visibleNavLinks.map((navLink) => (
                            <li key={navLink.path}>
                                {(!navLink.subRoutes || navLink.subRoutes.length === 0) && (
                                    <NavLink
                                        to={navLink.path}
                                        activeClassName="active"
                                        className="navigation__nav-link"
                                    >
                                        <span className="label">{navLink.label}</span>
                                    </NavLink>
                                )}
                                {navLink.subRoutes && navLink.subRoutes.length > 0 && (
                                    <SubNavigationMenu
                                        menuLabel={navLink.label}
                                        active={location.pathname.startsWith(navLink.path)}
                                    >
                                        {navLink.subRoutes.map((subNavItem) => (
                                            <SubNavigationMenuItem
                                                key={subNavItem.path}
                                                path={subNavItem.path}
                                                label={subNavItem.label}
                                            />
                                        ))}
                                    </SubNavigationMenu>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        )}

        {navLabel && (
            <div className="layout__item layout__item--right u-fit">
                <div className="navigation__label">
                    {navLabel}
                </div>
            </div>
        )}
    </div>
);

NavigationDesktop.displayName = 'NavigationDesktop';

export default withRouter(NavigationDesktop);
