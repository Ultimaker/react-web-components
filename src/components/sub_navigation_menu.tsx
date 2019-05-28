import * as React from 'react';
import classNames from 'classnames';

// components
import DropDownMenu from './drop_down_menu';

export interface SubNavigationMenuProps {
    menuLabel: string;
    active: boolean;
    children: JSX.Element | JSX.Element[];
}

/**
 * Component that displays information about a product
 */
export const SubNavigationMenu: React.StatelessComponent<SubNavigationMenuProps> = ({
    menuLabel, active, children,
}) => {
    const navClasses = classNames('sub-navigation-menu', { 'sub-navigation-menu--active': active });

    return (
        <div className={navClasses}>
            <DropDownMenu activeLabel={menuLabel}>
                {children}
            </DropDownMenu>
        </div>

    );
};

SubNavigationMenu.displayName = 'SubNavigationMenu';

export default SubNavigationMenu;
