import * as React from 'react';
import classNames from 'classnames';

// components
import Button from './button';

export interface SelectListItemProps {
    /** This should be set to true when the item is selected */
    active: boolean;
    /** Disables the menu item when true */
    disabled?: boolean;
    /** Called when the menu item is clicked */
    onChangeHandler: (value: string | number, disabled: boolean) => void;
    /** The label for the menu item */
    label: string;
    /** The value of the menu item */
    value: string | number;
}

export const SelectListItem: React.StatelessComponent<SelectListItemProps> = ({
    active, disabled, onChangeHandler, label, value,
}) => (
    <li>
        <Button
            className={classNames('context-menu__button', { disabled, active })}
            style="no-style"
            onClickHandler={() => onChangeHandler(value, disabled)}
            disabled={disabled}
        >
            {label}
        </Button>
    </li>
);

SelectListItem.displayName = 'SelectListItem';

export default SelectListItem;
