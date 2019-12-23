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

export const Checkbox: React.FC<CheckboxProps> = ({
    id, value, onChangeHandler, disabled,
}) => {
    const classes = classNames('checkbox', { 'checkbox--checked': value, 'checkbox--disabled': disabled });

    return (
        <div className={classes}>
            <label htmlFor={id}>
                <input
                    className="checkbox__input"
                    id={id}
                    name={id}
                    type="checkbox"
                    checked={value !== null ? value : false}
                    onChange={(e) => onChangeHandler(e.currentTarget.checked)}
                    disabled={disabled}
                />
                <span className="checkbox__visual" />
            </label>
        </div>
    );
};


Checkbox.defaultProps = {
    value: false,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
