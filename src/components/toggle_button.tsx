import * as React from 'react';

export interface ToggleButtonProps {
    /** Checkbox id. Must be unique */
    id: string;
    /** Whether the checkbox is checked or not */
    value: boolean;
    /** Called when the toggle is clicked */
    onChangeHandler: (checked: boolean) => void;
    /** Disables the toggle when true */
    disabled?: boolean;
}

export const ToggleButton: React.StatelessComponent<ToggleButtonProps> = ({ id, value, onChangeHandler, disabled }) => {

    const _onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(e.currentTarget.checked);
    }

    const _stopPropagation = (e: React.MouseEvent<EventTarget>) => {
        e.stopPropagation()
    }

    return (
        <div className="toggle-button-container" onClick={_stopPropagation}>
            <input
                className="toggle-button"
                id={id}
                name={id}
                type="checkbox"
                checked={value !== null ? value : false}
                onChange={_onChangeHandler}
                disabled={disabled}
            />
            <label htmlFor={id}></label>
        </div>
    );
};

ToggleButton.defaultProps = {
    value: false
};

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
