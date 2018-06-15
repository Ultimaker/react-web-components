import * as React from 'react';

export interface CheckboxProps {
  id: string;
  checked: boolean;
  onChangeHandler: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.StatelessComponent<CheckboxProps> = ({ id, checked, onChangeHandler, disabled }) => {

  const _onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e.currentTarget.checked);
  }

  const _stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="checkbox" onClick={_stopPropagation}>
      <input
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

Checkbox.defaultProps = {
  checked: false
};

export default Checkbox;