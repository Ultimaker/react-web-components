import * as React from 'react';
import classNames from 'classnames';

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
    <div className={classNames('toggle-button', { 'toggle-button--checked': value })}>
        <label htmlFor={id}>
            <input
                className="toggle-button__input"
                id={id}
                name={id}
                type="checkbox"
                checked={value !== null ? value : false}
                onChange={e => onChangeHandler(e.currentTarget.checked)}
                disabled={disabled}
            />
            <span className="toggle-button__slider" />
        </label>
    </div>
);

ToggleButton.defaultProps = {
    value: false,
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
