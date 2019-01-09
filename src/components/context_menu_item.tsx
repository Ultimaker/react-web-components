import * as React from 'react';

// components
import DropDownMenuItem from './drop_down_menu_item';

export interface ContextMenuItemProps {
    /** Disables the menu item when true */
    disabled?: boolean;
    /** Called when the Button is clicked */
    onClickHandler: () => void;
    /** Optional ID for the menu item */
    id?: string;
    /** Optional class for the menu item */
    className?: string;
}

export const ContextMenuItem: React.StatelessComponent<ContextMenuItemProps> = ({
    disabled, onClickHandler, id, className, children,
}) => (
    <DropDownMenuItem
        active={false}
        disabled={disabled}
        onClickHandler={onClickHandler}
        id={id}
        className={className}
    >
        {children}
    </DropDownMenuItem>
);

ContextMenuItem.displayName = 'ContextMenuItem';

export default ContextMenuItem;
