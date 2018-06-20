import * as React from 'react';
import * as classNames from 'classnames';

export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email';
export type labelPosition = 'left' | 'top';
export type WidthFraction = '1/1' | '1/2' | '1/3' | '1/4' | '1/5';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  /** Input field type: 'text' | 'number' | 'textarea' | 'password' | 'email' */
  type?: InputFieldType;
  /** Input field id. Must be unique */
  id: string;
  /** Input field label */
  label?: string;
  /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  labelWidthFraction?: WidthFraction;
  /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
  labelWidthBreakpoint?: WidthFraction;
  /** Input field will be displayed in the error state when true */
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
    type: 'text',
    labelWidthFraction: '1/1',
    labelWidthBreakpoint: 'sm'
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

  protected _renderLabel(): JSX.Element {
    const { id, label, labelWidthFraction, labelWidthBreakpoint } = this.props;

    return <div className={`input-field--label layout__item u-${labelWidthFraction}-${labelWidthBreakpoint}`}>
      <label htmlFor={id}>{label}</label>
    </div>
  }

  protected _renderInput(): JSX.Element {
    const { id, type, validationError, min, max, placeholder } = this.props;
    const classes = classNames('input', { 'error': validationError });

    if (type !== "textarea") {
      return (
        <input
          id={id}
          type={type}
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
          id={id}
          onChange={this._onChangeHandler}
          placeholder={placeholder}
          className={classes}
          ref={input => this.input = input}
        />
      )
    }
  }

  protected _renderValidationText(): JSX.Element {
    const { validationErrorMsg } = this.props;
    return <div className="input-field--error-message">{validationErrorMsg}</div>
  }

  render(): JSX.Element {
    const { label, labelWidthFraction, labelWidthBreakpoint, validationError } = this.props;

    return (
      <div className="input-field layout">
        {label && this._renderLabel()}
        <div className={`layout__item layout__item--bottom u-fill`}>
          {this._renderInput()}
          {validationError && this._renderValidationText()}
        </div>
      </div>
    )
  };
};

export default InputField;