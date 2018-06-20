import * as React from 'react';
import * as classNames from 'classnames';

export type InputFieldType = 'text' | 'number' | 'textarea';

export interface InputFieldProps {
  /** Input field type: 'text' | 'number' | 'textarea' */
  type?: InputFieldType;
  /** Input field id. Must be unique */
  id: string;
  /** Input field label */
  label?: string;
  /** Applies the validation error styling when true  */
  validationError?: boolean;
  /** Message to show for the validation error */
  validationErrorMsg?: string;
  /** Called when the field changes */
  onChangeHandler: (value: string | number) => (void);
  /** Input field default value */
  defaultValue?: string | number;
  /** Minimum value for number field */
  min?: number;
  /** Maximum value for number field */
  max?: number;
  /** html placeholder text */
  placeholder?: string;
  /** If true, the field will be focused when loaded */
  focusOnLoad?: boolean;
}

export class InputField extends React.Component<InputFieldProps, {}> {

  static defaultProps = {
    type: 'text'
  };

  private input;

  constructor(props: InputFieldProps) {
    super(props);

    this._onChangeHandler = this._onChangeHandler.bind(this);
  }

  componentDidMount(): void {
    this._focusOnPromptInput();
    this._setDefaultNumber();
  }

  _focusOnPromptInput(): void {
    const { focusOnLoad } = this.props;

    if (this.input && focusOnLoad) {
      this.input.focus();
    }
  }

  _setDefaultNumber() {
    const { defaultValue } = this.props;

    if (defaultValue) {
      this.input.value = defaultValue.toString();
    }
  }

  _onChangeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { onChangeHandler } = this.props;

    e.stopPropagation();

    if (onChangeHandler) {
      onChangeHandler(e.target.value);
    }
  }

  protected _renderLabel(id: string, label: string): JSX.Element {
    return <label className="input-field--label" htmlFor={id}>{label}</label>
  }

  protected _renderInput(id: string): JSX.Element {
    const { type, validationError, min, max, placeholder } = this.props;
    const classes = classNames('input', { 'error': validationError });

    if (type !== "textarea") {
      return (
        <input
          id={id}
          type={type ? type : null}
          min={min ? min : null}
          max={max ? max : null}
          onChange={this._onChangeHandler}
          placeholder={placeholder}
          className={classes}
          ref={input => this.input = input}
        />
      )
    } else {
      return (
        <textarea
          onChange={this._onChangeHandler}
          placeholder={placeholder}
          className={classes}
          ref={input => this.input = input}
        />
      )
    }
  }

  protected _renderValidationText(validationErrorMsg: string): JSX.Element {
    return <div className="input-field--error-message">{validationErrorMsg}</div>
  }

  render(): JSX.Element {
    const { id, label, validationError, validationErrorMsg } = this.props;

    return (
      <div className="input-field">
        {label && this._renderLabel(id, label)}
        {this._renderInput(id)}
        {validationError && this._renderValidationText(validationErrorMsg)}
      </div>
    )
  };
};

export default InputField;