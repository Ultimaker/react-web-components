import * as React from 'react';

export interface CheckboxProps {
  /** Checkbox id. Must be unique */
  id: string;
  /** Whether the checkbox is checked or not */
  defaultValue?: boolean;
  /** Called when the checkbox is clicked */
  onChangeHandler: (checked: boolean) => void;
  /** Disables the checkbox when true */
  disabled?: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, {}> {

  private input;

  constructor(props) {
    super(props);

    this._onChangeHandler = this._onChangeHandler.bind(this);
  }

  componentDidMount(): void {
    this._setDefaultValue();
  }

  _setDefaultValue() {
    const { defaultValue } = this.props;
    
    if (defaultValue === true) {
      this.input.checked = defaultValue;
    }
  }

  _onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChangeHandler(e.currentTarget.checked);
  }

  _stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  render(): JSX.Element {
    const { id, disabled } = this.props;

    return <div className="checkbox" onClick={this._stopPropagation} >
      <input
        id={id}
        name={id}
        type="checkbox"
        onChange={this._onChangeHandler}
        disabled={disabled}
        ref={input => this.input = input}
      />
      <label htmlFor={id}></label>
    </div>
  }
}

export default Checkbox;