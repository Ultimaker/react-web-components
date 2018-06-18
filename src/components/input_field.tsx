import * as React from 'react';
import * as classNames from 'classnames';

export type InputFieldType = 'text' | 'number' | 'textarea';

export interface InputFieldProps {
  /** Field type: 'text' | 'number' | 'textarea' */
  type?: InputFieldType;
  /** Applies the validation error styling when true  */
  validationError?: boolean;
  /** Called when the field changes */
  onChangeHandler: (value: string | number) => (void);
  /** Min value and default value for number field */
  min?: number;
  /** Max value for number field */
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
    const { type, min } = this.props;

    if (type === 'number' && min) {
      this.input.value = min.toString();
    }
  }

  _onChangeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { onChangeHandler } = this.props;

    e.stopPropagation();

    if (onChangeHandler) {
      onChangeHandler(e.target.value);
    }
  }

  render(): JSX.Element {
    const { type, validationError, onChangeHandler, min, max, placeholder } = this.props;

    const classes = classNames('text-field', { 'error': validationError });

    return <React.Fragment>
      {type !== 'textarea' &&
        <input
          type={type ? type : null}
          min={min ? min : null}
          max={max ? max : null}
          onChange={this._onChangeHandler}
          placeholder={placeholder}
          className={classes}
          ref={input => this.input = input} />
      }
      {type === 'textarea' &&
        <textarea
          onChange={this._onChangeHandler}
          placeholder={placeholder}
          className={classes}
          ref={input => this.input = input} />
      }
    </ React.Fragment>
  };
};

export default InputField;