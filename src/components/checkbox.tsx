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

export const Checkbox: React.StatelessComponent<CheckboxProps> = ({ id, value, onChangeHandler, disabled }) => {

    const _onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(e.currentTarget.checked);
    }

    const _stopPropagation = (e: React.MouseEvent<EventTarget>) => {
        e.stopPropagation()
    }


    const classes = classNames('checkbox', { disabled });

    return <div className={classes} onClick={_stopPropagation} >
        <input
            id={id}
            name={id}
            type="checkbox"
            checked={value !== null ? value : false}
            onChange={_onChangeHandler}
            disabled={disabled}
        />
        <label htmlFor={id}></label>
    </div>
}


Checkbox.defaultProps = {
    value: false
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
