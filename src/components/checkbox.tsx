import * as React from 'react';
import classNames from 'classnames';

export interface CheckboxProps {
    /** Checkbox id. Must be unique */
    id: string;
    /** The value of the checkbox */
    value: boolean;
    /** Called when the checkbox is clicked */
    onChangeHandler: (checked: boolean) => void;
    /** Disables the checkbox when true */
    disabled?: boolean;
}

export const Checkbox: React.StatelessComponent<CheckboxProps> = ({
    id, value, onChangeHandler, disabled,
}) => {
    const classes = classNames('checkbox', { disabled });

    return (
        <div className={classes} onClick={e => e.stopPropagation()} role="checkbox">
            <input
                id={id}
                name={id}
                type="checkbox"
                checked={value !== null ? value : false}
                onChange={e => onChangeHandler(e.currentTarget.checked)}
                disabled={disabled}
            />
            <label htmlFor={id} />
        </div>
    );
};


Checkbox.defaultProps = {
    value: false,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
