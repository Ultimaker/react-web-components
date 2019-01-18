import * as React from 'react';
import classNames from 'classnames';

// components
import Button from './button';

export interface DropDownMenuItemProps {
    /** Whether the item is the active item */
    active: boolean;
    /** Disables the menu item when true */
    disabled?: boolean;
    /** Called when the Button is clicked */
    onClickHandler: () => void;
    /** Optional ID for the menu item */
    id?: string;
    /** Optional class for the menu item */
    className?: string;
    /** Passed by the DropDownMenu component */
    onCloseMenuHandler?: () => void;
}

export const DropDownMenuItem: React.StatelessComponent<DropDownMenuItemProps> = ({
    active, disabled, onClickHandler, id, className, onCloseMenuHandler, children,
}) => {
    const _onClickHandler = () => {
        onClickHandler();

        if (onCloseMenuHandler) {
            onCloseMenuHandler();
        }
    };

    return (
        <li>
            <Button
                id={id}
                className={classNames('drop-down-menu-base__item', { disabled, active }, className)}
                appearance="no-style"
                onClickHandler={_onClickHandler}
                disabled={disabled}
            >
                {children}
            </Button>
        </li>
    );
};

DropDownMenuItem.displayName = 'DropDownMenuItem';

export default DropDownMenuItem;
