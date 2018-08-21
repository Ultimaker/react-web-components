import * as React from 'react';
import classNames from 'classnames';

import InputFieldLabel from './input_field_label';
import InputFieldInput from './input_field_input';
import InputFieldValidation from './input_field_validation';
import { SelectOption } from './select_list';
import { ImageFile } from './image_upload';
import { ImageShape } from './image';

export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'tags' | 'children';
export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';
export type InputFieldValue = string | number | boolean | ImageFile | string[] | HTMLInputElement;

export interface InputFieldProps {
  /** Input field type: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'children' */
  type?: InputFieldType;
  /** Input field id. Must be unique */
  id: string;
  /** Additional classes for styling */
  className?: string;
  /** Input field will be centered if true. Useful for type image or checkbox */
  centerInputField?: boolean;
  /** Message to show for the validation error. Can be any[] if returned from I18n.format */
  validationError?: string | any[];
  /** Called when the field changes */
  onChangeHandler: (id: string, value: InputFieldValue) => void;
  /** Input field value */
  value: InputFieldValue;
  /** Minimum value for number field */
  min?: number;
  /** Maximum value for number field */
  max?: number;
  /** html placeholder text */
  placeholder?: string;
  /** If true, the field will be focused when loaded */
  focusOnLoad?: boolean;
  /** List of options for type select */
  selectOptions?: SelectOption[];
  /** Size of the image for type image. Include size unit */
  imageSize?: string;
  /** Shape of the image for type image: 'round' | 'square' */
  imageShape?: ImageShape;
  /** If true, the defaultValue is shown as plain text and the input hidden */
  staticField?: boolean
  /** A list of suggestions for tags input field */
  tagSuggestions?: string[]
  /** Displays the required icon when true */
  required?: boolean
  /** Whether the form has been submitted. This will be set by the Form component */
  submitted?: boolean
  /** Input field label */
  label?: string | JSX.Element;
  /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  labelLayoutWidth?: LayoutWidth;
  /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
  labelWidthBreakpoint?: Breakpoint;
  /** JSX Element, such as an icon, to be shown before the input label */
  preLabelElement?: JSX.Element
  /** Description of the fields to be shown in a tooltip */
  infoText?: string
  /** The URL of the link to be shown next to the input field */
  infoLinkURL?: string
  /** A list of suggestions for tags input field */
}

export interface InputFieldState {
  /** Indicates if the field has been touched (changed) or not from the default value. */
  touched: boolean;
}

export class InputField extends React.Component<InputFieldProps, InputFieldState> {

  public static defaultProps: Partial<InputFieldProps> = {
    type: 'text',
    labelLayoutWidth: '1/1',
    labelWidthBreakpoint: 'sm'
  };

  state = {
    touched: false
  }

  constructor(props) {
    super(props);
    // bind callbacks once
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._showValidationError = this._showValidationError.bind(this);
  }

  _onChangeHandler(value: InputFieldValue): void {
    this.setState({ touched: true });
    const { onChangeHandler, id, type } = this.props;

    if (value === '') {
      value = null;
    }
    else if (type === 'number' && typeof value === 'string' && value.length > 0) {
      // convert value from and string to a number for number input fields
      value = parseFloat(value);
    }

    if (onChangeHandler) {
      onChangeHandler(id, value);
    }
  }

  _showValidationError() {
    const { validationError, submitted } = this.props;
    const { touched } = this.state;
    return validationError && (touched || submitted)
  }

  protected _renderLabel(): JSX.Element {
    const { id, label, labelLayoutWidth, labelWidthBreakpoint, type, preLabelElement, infoText, infoLinkURL } = this.props;

    if (label) {
      return <InputFieldLabel
        type={type}
        id={id}
        label={label}
        labelLayoutWidth={labelLayoutWidth}
        labelWidthBreakpoint={labelWidthBreakpoint}
        preLabelElement={preLabelElement}
        infoText={infoText}
        infoLinkURL={infoLinkURL}
      />
    }
    return null;
  }

  protected _renderInputElements() {
    const { id, type, centerInputField, validationError, value, min, max, placeholder,
      selectOptions, imageSize, staticField, imageShape, tagSuggestions,
      focusOnLoad, required, labelLayoutWidth, labelWidthBreakpoint, children } = this.props;

    return <InputFieldInput
      type={type}
      id={id}
      centerInputField={centerInputField}
      onChangeHandler={this._onChangeHandler}
      value={value}
      min={min}
      max={max}
      placeholder={placeholder}
      focusOnLoad={focusOnLoad}
      selectOptions={selectOptions}
      imageSize={imageSize}
      imageShape={imageShape}
      staticField={staticField}
      tagSuggestions={tagSuggestions}
      required={required}
      showValidationError={this._showValidationError()}
      labelLayoutWidth={labelLayoutWidth}
      labelWidthBreakpoint={labelWidthBreakpoint}
      children={children}
    />
  }

  protected _renderValidation(): JSX.Element {
    const { validationError, labelLayoutWidth, labelWidthBreakpoint, required } = this.props;

    if (this._showValidationError() && validationError) {
      return <InputFieldValidation
        validationError={validationError}
        labelLayoutWidth={labelLayoutWidth}
        labelWidthBreakpoint={labelWidthBreakpoint}
        required={required}
      />
    }
    return null;
  }


  render(): JSX.Element {
    const { className, staticField, type } = this.props;

    const inputClasses = classNames(`input-field input-field--${type} layout`, className, { 'hide-input': staticField });

    return (
      <div className={inputClasses}>
        {this._renderLabel()}
        {this._renderInputElements()}
        {this._renderValidation()}
      </div>
    )
  };
};

export default InputField;
