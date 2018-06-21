import * as React from 'react';
import * as classNames from 'classnames';

import DropDownMenu from './drop_down_menu';
import DropDownMenuItem from './drop_down_menu_item';
import { Checkbox } from './checkbox';

export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'select' | 'checkbox';
export type labelPosition = 'left' | 'top';
export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill' ;
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  /** Input field type: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'select' */
  type?: InputFieldType;
  /** Input field id. Must be unique */
  id: string;
  /** Input field label */
  label?: string | JSX.Element;
  /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  labelLayoutWidth?: LayoutWidth;
  /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
  labelWidthBreakpoint?: Breakpoint;
  /** Input field will be displayed in the error state when true */
  validationError?: boolean;
  /** Message to show for the validation error */
  validationErrorMsg?: string;
  /** Called when the field changes */
  onChangeHandler: (id: string, value: string | number | boolean) => void;
  /** Input field default value */
  defaultValue?: string | number | boolean;
  /** Minimum value for number field */
  min?: number;
  /** Maximum value for number field */
  max?: number;
  /** html placeholder text */
  placeholder?: string;
  /** If true, the field will be focused when loaded */
  focusOnLoad?: boolean;
  /** Selected option for type select */
  selectActiveOption?: string;
  /** List of options for type select */
  selectOptions?: string[];
  /** Disabled state for checkbox type */
  disabled?: boolean;
}

export class InputField extends React.Component<InputFieldProps, {}> {

  static defaultProps = {
    type: 'text',
    labelLayoutWidth: '1/1',
    labelWidthBreakpoint: 'sm'
  };

  constructor(props) {
    super(props);

    this._onChangeHandler =  this._onChangeHandler.bind(this);
  }

  private input;

  componentDidMount(): void {
    this._focusOnPromptInput();
    this._setDefaultValue();
  }

  _focusOnPromptInput(): void {
    const { focusOnLoad } = this.props;

    if (this.input && focusOnLoad) {
      this.input.focus();
    }
  }

  _setDefaultValue() {
    const { defaultValue, type } = this.props;

    if (defaultValue && type !== "checkbox" && type !== "select") {
      this.input.value = defaultValue.toString();
    }
  }

  _onChangeHandler(value: string | number | boolean) {
    const { onChangeHandler, id } = this.props;

    event.stopPropagation();

    if (onChangeHandler) {
      onChangeHandler(id, value);
    }
  }

  protected _renderLabel(): JSX.Element {
    const { id, label, labelLayoutWidth, labelWidthBreakpoint } = this.props;

    return <div className={`input-field--label layout__item u-${labelLayoutWidth}-${labelWidthBreakpoint}`}>
      <label htmlFor={id}>{label}</label>
    </div>
  }

  protected _renderInput(): JSX.Element {
    const { id, type, validationError, min, max, placeholder, selectActiveOption, selectOptions, disabled, defaultValue } = this.props;
    const classes = classNames('input', { 'error': validationError });

    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={id}
          onChange={(e) => this._onChangeHandler(e.target.value)}
          placeholder={placeholder}
          className={classes}
          ref={input => this.input = input}
        />
      )
    } else if (type === "select") {
      return (
        <DropDownMenu label={selectActiveOption}>
          {selectOptions.map((option, index) => {
            return <DropDownMenuItem key={index} onClickHandler={this._onChangeHandler}
              label={option}
              active={selectActiveOption === option} />
          })}
        </DropDownMenu>
      )
    } else if (type === "checkbox") {
      return (
        <Checkbox
          id={id}
          onChangeHandler={this._onChangeHandler}
          defaultValue={defaultValue === true}
          disabled={disabled}
        />
      )
    } else {
      return (
        <input
          id={id}
          name={id}
          type={type}
          min={min ? min : null}
          max={max ? max : null}
          onChange={(e) => this._onChangeHandler(e.target.value)}
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
    const { label, validationError, labelLayoutWidth } = this.props;

    const inputLayoutWidth = labelLayoutWidth === 'fill' ? 'fit' : 'fill';

    return (
      <div className="input-field layout">
        {label && this._renderLabel()}
        <div className={`layout__item layout__item--middle u-${inputLayoutWidth}`}>
          {this._renderInput()}
          {validationError && this._renderValidationText()}
        </div>
      </div>
    )
  };
};

export default InputField;