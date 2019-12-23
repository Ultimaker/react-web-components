import * as React from 'react';

import { NavLink } from 'react-router-dom';

export interface SubNavigationMenuItemProps {
    path: string;
    label: string;
    /** Passed by the DropDownMenu component */
    onCloseMenuHandler?: () => void;
}

/**
 * Component that displays information about a product
 */
export const SubNavigationMenuItem: React.FC<SubNavigationMenuItemProps> = ({
    path, label, onCloseMenuHandler,
}) => (
    <NavLink
        to={path}
        className="sub-navigation-menu-item drop-down-menu-base__item"
        activeClassName="active"
        onClick={onCloseMenuHandler}
    >
        <div className="label">{label}</div>
    </NavLink>
);

SubNavigationMenuItem.displayName = 'SubNavigationMenuItem';

export default SubNavigationMenuItem;
