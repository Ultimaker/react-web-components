import * as React from 'react';
import classNames from 'classnames';

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

  public static displayName = 'Checkbox';

  private inputRef;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this._onChangeHandler = this._onChangeHandler.bind(this);
  }

  componentDidMount(): void {
    this._setDefaultValue();
  }

  _setDefaultValue() {
    const { defaultValue } = this.props;
    
    if (defaultValue === true) {
      this.inputRef.current.checked = defaultValue;
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

    const classes = classNames('checkbox', { disabled });

    return <div className={classes} onClick={this._stopPropagation} >
      <input
        id={id}
        name={id}
        type="checkbox"
        onChange={this._onChangeHandler}
        disabled={disabled}
        ref={this.inputRef}
      />
      <label htmlFor={id}></label>
    </div>
  }
}

export default Checkbox;