import * as React from 'react';
import * as classNames from 'classnames';

import DropDownMenu from './drop_down_menu';
import DropDownMenuItem from './drop_down_menu_item';
import Checkbox from './checkbox';
import { ImageUpload, ImageFile } from './image_upload';
import DatePicker from './date_picker';

export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'select' | 'checkbox' | 'image' | 'date';
export type labelPosition = 'left' | 'top';
export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  /** Input field type: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'select' | 'checkbox' | 'image' | 'date' */
  type?: InputFieldType;
  /** Input field id. Must be unique */
  id: string;
  /** Input field label */
  label?: string | JSX.Element;
  /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  labelLayoutWidth?: LayoutWidth;
  /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
  labelWidthBreakpoint?: Breakpoint;
  /** Input field will be centered if true. Useful for type image or checkbox */
  centerInputField?: boolean;
  /** Input field will be displayed in the error state when true */
  validationError?: boolean;
  /** Message to show for the validation error */
  validationErrorMsg?: string;
  /** Called when the field changes */
  onChangeHandler: (id: string, value: string | number | boolean | ImageFile) => void;
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
  /** Size of the image for type image. Include size unit */
  imageSize?: string;
}

export interface InputFieldState {
  /** Indicates if the field has been touched (changed) or not from the default value. */
  touched: boolean;
}

export class InputField extends React.Component<InputFieldProps, InputFieldState> {

  public static defaultProps: Partial<InputFieldProps> = {
    type: 'text',
    labelLayoutWidth: '1/1',
    labelWidthBreakpoint: 'sm',
    centerInputField: false
  };

  state = {
    touched: false
  }

  private input;

  constructor(props) {
    super(props);

    // bind callbacks once
    this._onChangeHandler = this._onChangeHandler.bind(this);
  }

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

    if (defaultValue && (type === 'text' || type === 'number' || type === 'textarea' || type === 'password' || type === 'email')) {
      this.input.value = defaultValue.toString();
    }
  }

  _onChangeHandler(value: string | number | boolean | ImageFile) {
    this.setState({ touched: true });
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
    const { id, type, validationError, min, max, placeholder, selectActiveOption, selectOptions, disabled,
      defaultValue, imageSize } = this.props;
    const classes = classNames('input', { 'error': validationError && this.state.touched });

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
        <DropDownMenu label={selectActiveOption} error={validationError && this.state.touched}>
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
    } else if (type === "image") {
      return (
        <ImageUpload size={imageSize}
          defaultURL={defaultValue ? defaultValue.toString() : null}
          onFileSelection={this._onChangeHandler}
        />
      )
    } else if (type === "date") {
      return (
        <DatePicker
          id={id}
          onChangeHandler={this._onChangeHandler}
          defaultDate={defaultValue ? defaultValue.toString() : null}
          error={validationError && this.state.touched}
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
    const { validationErrorMsg, labelLayoutWidth, labelWidthBreakpoint } = this.props;
    let errorMsgOffsetClass;

    if (labelLayoutWidth === 'fill' || labelLayoutWidth === 'fit') {
      // align validation message to the right
      errorMsgOffsetClass = 'u-fill'
    }
    else {
      // align validation message under input (after label width)
      errorMsgOffsetClass = `u-${labelLayoutWidth}-${labelWidthBreakpoint}`
    }

    return <div className="layout__item u-full">
      <div className="layout">
        {labelLayoutWidth !== '1/1' &&
          <div className={`layout__item ${errorMsgOffsetClass}`}></div>
        }
        <div className="layout__item u-fit">
          <div className="input-field--error-message">{validationErrorMsg}</div>
        </div>
      </div>
    </div>
  }

  render(): JSX.Element {
    const { label, validationError, labelLayoutWidth, centerInputField } = this.props;

    const inputLayoutWidth = labelLayoutWidth === 'fill' ? 'fit' : 'fill';

    const inputLayoutClasses = classNames(`layout__item layout__item--middle u-${inputLayoutWidth}`, { 'text-center': centerInputField });

    return (
      <div className="input-field layout">
        {label && this._renderLabel()}
        <div className={inputLayoutClasses}>
          {this._renderInput()}
        </div>
        {validationError && this.state.touched && this._renderValidationText()}
      </div>
    )
  };
};

export default InputField;