import * as React from 'react';
import classNames from 'classnames';
import moment = require('moment');

import { SelectList, SelectOption } from './select_list';
import Checkbox from './checkbox';
import { ImageUpload, ImageFile } from './image_upload';
import { Image, ImageShape } from './image';
import DatePicker from './date_picker';
import TagsSelector from './tags_selector';
import InfoTooltip from './info_tooltip';
import InfoLink from './info_link';
import FileUpload from './file_upload';
import RequiredIcon from './icons/required_icon';

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
  onChangeHandler: (id: string, value: InputFieldValue) => void;
  /** Input field default value */
  defaultValue?: InputFieldValue;
  /** Minimum value for number field */
  min?: number;
  /** Maximum value for number field */
  max?: number;
  /** html placeholder text */
  placeholder?: string;
  /** If true, the field will be focused when loaded */
  focusOnLoad?: boolean;
  /** Selected option for type select */
  selectActiveOptionValue?: string | number;
  /** List of options for type select */
  selectOptions?: SelectOption[];
  /** Size of the image for type image. Include size unit */
  imageSize?: string;
  /** Shape of the image for type image: 'round' | 'square' */
  imageShape?: ImageShape;
  /** If true, the defaultValue is shown as plain text and the input hidden */
  staticField?: boolean
  /** Description of the fields to be shown in a tooltip */
  infoText?: string
  /** The URL of the link to be shown next to the input field */
  infoLinkURL?: string
  /** A list of suggestions for tags input field */
  tagSuggestions?: string[]
  /** Displays the required icon when true */
  required?: boolean
  /** Whether the form has been submitted. This will be set by the Form component */
  submitted?: boolean
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

  private inputRef;

  state = {
    touched: false
  }

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    // bind callbacks once
    this._onChangeHandler = this._onChangeHandler.bind(this);
  }

  componentDidMount(): void {
    this._focusOnPromptInput();
    this._setDefaultValue();
  }

  _focusOnPromptInput(): void {
    const { focusOnLoad } = this.props;

    if (this.inputRef.current && focusOnLoad) {
      this.inputRef.current.focus();
    }
  }

  _setDefaultValue() {
    const { defaultValue, type } = this.props;

    if (defaultValue && this.inputRef.current && (type === 'text' || type === 'number' || type === 'textarea' || type === 'password' || type === 'email' || type === 'url')) {
      this.inputRef.current.value = defaultValue.toString();
    }
  }

  _onChangeHandler(value: InputFieldValue): void {
    this.setState({ touched: true });
    const { onChangeHandler, id, type } = this.props;

    if (type === 'number' && typeof value === 'string') {
      // convert value from and string to a number for number input fields
      value = parseFloat(value);
    }

    if (onChangeHandler) {
      onChangeHandler(id, value);
    }
  }

  protected _renderLabel(): JSX.Element {
    const { id, label, labelLayoutWidth, labelWidthBreakpoint, type } = this.props;

    const classes = classNames(`input-field__label layout__item u-${labelLayoutWidth}-${labelWidthBreakpoint}`,
      { 'tag-selector-label': type === 'tags' && labelLayoutWidth && labelLayoutWidth !== '1/1' });

    return <div className={classes}>
      <div className="layout layout--gutter-xs" >
        <div className="layout__item u-fit">
          <label htmlFor={id}>{label}</label>
        </div>
        {this._renderLabelAddition()}
      </div>
    </div>
  }

  protected _renderLabelAddition(): JSX.Element {
    const { infoText, infoLinkURL } = this.props;

    if (infoText || infoLinkURL) {
      return <div className="layout__item u-fit input-field__label-addition">
        {infoText &&
          <InfoTooltip infoText={infoText} />
        }
        {infoLinkURL && !infoText && // can't have both an InfoTooltip and a InfoLink
          <InfoLink infoLinkURL={infoLinkURL} />
        }
      </div>
    }

    return null;
  }

  protected _showValidationError(){
    const { validationError, submitted } = this.props;
    const { touched } = this.state;
    return validationError && (touched || submitted )
  }

  protected _renderInput(): React.ReactNode {
    const { id, type, min, max, placeholder, selectActiveOptionValue, selectOptions,
      defaultValue, imageSize, staticField, imageShape, tagSuggestions, focusOnLoad, infoText, infoLinkURL,
      required, children } = this.props;

    const classes = classNames('input',
      { 'error': this._showValidationError() },
      { 'pad-right': (infoText || infoLinkURL || required) }) // add extra padding inside the field if an icon is shown inside the input field

    if (type === 'children') {
      return children;
    }
    if (type === 'textarea') {
      return (
        <textarea
          id={id}
          name={id}
          onChange={(e) => this._onChangeHandler(e.target.value)}
          placeholder={placeholder}
          className={classes}
          ref={this.inputRef}
          rows={3}
        />
      )
    }
    if (type === 'select') {
      return (
        <SelectList
          onChangeHandler={this._onChangeHandler}
          activeOptionValue={selectActiveOptionValue}
          options={selectOptions}
          error={this._showValidationError()}
        />
      )
    }
    if (type === 'checkbox') {
      return (
        <Checkbox
          id={id}
          onChangeHandler={this._onChangeHandler}
          defaultValue={defaultValue === true}
          disabled={staticField}
        />
      )
    }
    if (type === 'image') {
      return (
        <ImageUpload size={imageSize}
          defaultURL={defaultValue ? defaultValue.toString() : null}
          onFileSelection={this._onChangeHandler}
          shape={imageShape}
        />
      )
    }
    if (type === 'date') {
      return (
        <DatePicker
          id={id}
          onChangeHandler={this._onChangeHandler}
          defaultDate={defaultValue ? defaultValue.toString() : null}
          error={this._showValidationError()}
        />
      )
    }
    if (type === 'tags') {
      return <TagsSelector
        onChangeHandler={this._onChangeHandler}
        placeholder={placeholder}
        suggestions={tagSuggestions}
        defaultTags={Array.isArray(defaultValue) && defaultValue}
        disabled={staticField}
        autofocus={focusOnLoad}
      />
    }
    if (type === 'file') {
      return <FileUpload
        id={id}
        onChangeHandler={this._onChangeHandler}
        disabled={staticField}
      />
    }
    return (
      <input
        id={id}
        className={classes}
        name={id}
        type={type}
        min={min ? min : null}
        max={max ? max : null}
        onChange={(e) => this._onChangeHandler(e.target.value)}
        placeholder={placeholder}
        ref={this.inputRef}
      />
    )
  }

  protected _renderStaticValue(type: InputFieldType, value: InputFieldValue): JSX.Element | React.ReactNode | InputFieldValue {
    const { selectOptions, selectActiveOptionValue, imageSize, imageShape } = this.props;

    if (type === 'url') {
      return <a href={value.toString()} target="_blank">{value}</a>
    }
    if (type === 'email') {
      return <a href={`mailto:${value}`} target="_top">{value}</a>
    }
    if (type === 'date' && typeof value === 'string') {
      return moment(value).format('DD-MM-YYYY');
    }
    if (type === 'select') {
      const option = selectOptions.find(option => option.value === selectActiveOptionValue);
      return option ? option.label : null;
    }
    if (type === 'image') {
      return <Image src={value ? value.toString() : null} size={imageSize} shape={imageShape} />
    }
    if (type === 'checkbox' || type === 'tags') {
      return this._renderInput();
    }

    return value
  }

  protected _renderValidationText(): JSX.Element {
    const { validationErrorMsg, labelLayoutWidth, labelWidthBreakpoint } = this.props;
    let errorMsgOffsetClass;

    let validationText = null;

    if (this._showValidationError()) {
      validationText = validationErrorMsg;
    }

    if (labelLayoutWidth === 'fill' || labelLayoutWidth === 'fit') {
      // align validation message to the right
      errorMsgOffsetClass = 'u-fill'
    }
    else {
      // align validation message under input (after label width)
      errorMsgOffsetClass = `u-${labelLayoutWidth}-${labelWidthBreakpoint}`
    }

    if (validationText) {
      return <div className="layout__item u-full">
        <div className="layout">
          {labelLayoutWidth !== '1/1' &&
            <div className={`layout__item ${errorMsgOffsetClass}`}></div>
          }
          <div className="layout__item u-fill">
            <div className="input-field__error-message">{validationText}</div>
          </div>
        </div>
      </div>
    }
  }

  protected _renderInputFieldAddition() {
    const { required } = this.props;
    if (required) {
      return <div className="layout__item u-fit input-field__field-addition">
        <RequiredIcon />
      </div>
    }

    return null;
  }

  protected _renderChildren(): JSX.Element {
    const { children } = this.props;

    return <div className="layout__item u-fit">
      {children}
    </div>
  }

  render(): JSX.Element {
    const { label, className, labelLayoutWidth, centerInputField,
      staticField, defaultValue, type, children } = this.props;
      
    const inputLayoutWidth = labelLayoutWidth === 'fill' ? 'fit' : staticField || type === 'checkbox' ? 'fit' : 'fill';
    const inputClasses = classNames(`input-field input-field--${type} layout`, className, { 'hide-input': staticField });
    const inputLayoutClasses = classNames(`layout__item u-${inputLayoutWidth} layout__item--middle`, { 'text-center': centerInputField });

    return (
      <div className={inputClasses}>
        {label && this._renderLabel()}
        <div className={inputLayoutClasses}>

          <div className="input-container layout layout--gutter-xs">
            <div className="layout__item u-fill">
              {this._renderInput()}
            </div>
            {this._renderInputFieldAddition()}
          </div>

          {staticField && this._renderStaticValue(type, defaultValue)}
        </div>

        {type !== 'children' && children && this._renderChildren()}
        {this._renderValidationText()}
      </div>
    )
  };
};

export default InputField;
