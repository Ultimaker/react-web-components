import * as React from 'react';
import classNames from 'classnames';

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
}

export const ContextMenuItem: React.StatelessComponent<ContextMenuItemProps> =
    ({ disabled, onClickHandler, label, id, className }) => {

        const _onClickHandler = (e) => {
            if (disabled) {
                e.stopPropagation();
            }
            else {
                onClickHandler();
            }
        }

        return <li id={id} className={classNames({ disabled }, className)} onClick={_onClickHandler}>
            {label}
        </li>

    };

ContextMenuItem.displayName = "ContextMenuItem";

export default ContextMenuItem;
