import * as React from 'react';

export interface ToggleButtonProps {
  id: string;
  checked: boolean;
  onChangeHandler: Function;
  disabled?: boolean;
}

const ToggleButton: React.StatelessComponent<ToggleButtonProps> = ({ id, checked, onChangeHandler, disabled }) => {

  const _onChangeHandler = (e) => {
    onChangeHandler(e);
  }

  const _stopPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="toggle-button-container" onClick={_stopPropagation}>
      <input
        className="toggle-button"
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={_onChangeHandler}
        disabled={disabled}
      />
      <label htmlFor={id}></label>
    </div>
  );
};

ToggleButton.defaultProps = {
  checked: false
};

export default ToggleButton;