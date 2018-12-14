import * as React from 'react';
import classNames from 'classnames';

// components
import Button from './button';

export interface ContextMenuItemProps {
    /** Disables the menu item when true */
    disabled?: boolean;
    /** Called when the Button is clicked */
    onClickHandler: () => void;
    /** Label for the menu item */
    label: string;
    /** Optional ID for the menu item */
    id?: string;
    /** Optional class for the menu item */
    className?: string;
    /** Passed by the ContextMenu component */
    onCloseMenuHandler?: () => void;
}

export const ContextMenuItem: React.StatelessComponent<ContextMenuItemProps> = ({
    disabled, onClickHandler, label, id, className, onCloseMenuHandler,
}) => (
    <li>
        <Button
            id={id}
            className={classNames('context-menu__button', { disabled }, className)}
            style="no-style"
            onClickHandler={() => { onCloseMenuHandler(); onClickHandler(); }}
            disabled={disabled}
        >
            {label}
        </Button>
    </li>
);

ContextMenuItem.displayName = 'ContextMenuItem';

export default ContextMenuItem;
