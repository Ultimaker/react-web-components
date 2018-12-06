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

export const ToggleButton: React.StatelessComponent<ToggleButtonProps> = ({
    id, value, onChangeHandler, disabled,
}) => (
    <div className="toggle-button-container" onClick={e => e.stopPropagation()}>
        <input
            className="toggle-button"
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

ToggleButton.defaultProps = {
    value: false,
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
