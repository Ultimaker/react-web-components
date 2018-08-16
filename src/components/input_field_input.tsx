import * as React from 'react';
import classNames from 'classnames';
import moment = require('moment');

import { SelectList, SelectOption } from './select_list';
import Checkbox from './checkbox';
import { ImageUpload, ImageFile } from './image_upload';
import { Image, ImageShape } from './image';
import DatePicker from './date_picker';
import TagsSelector from './tags_selector';
import FileUpload from './file_upload';
import RequiredIcon from './icons/required_icon';

export type InputFieldInputType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'tags' | 'children';
export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';
export type InputFieldInputValue = string | number | boolean | ImageFile | string[] | HTMLInputElement;

export interface InputFieldInputProps {
  /** Input field type: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'children' */
  type: InputFieldInputType;
  /** Input field id. Must be unique */
  id: string;
  /** Input field will be centered if true. Useful for type image or checkbox */
  centerInputField?: boolean;
  /** Message to show for the validation error */
  validationErrorMsg?: string;
  /** Called when the field changes */
  onChangeHandler: (value: InputFieldInputValue) => void;
  /** Input field default value */
  defaultValue?: InputFieldInputValue;
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
  /** A list of suggestions for tags input field */
  tagSuggestions?: string[]
  /** Displays the required icon when true */
  required?: boolean
  /** Whether the validation error should be shown */
  showValidationError: boolean
  /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  labelLayoutWidth: LayoutWidth;
  /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
  labelWidthBreakpoint: Breakpoint;
  /** JSX Element, such as an icon, to be shown before the input label */
}

export class InputFieldInput extends React.Component<InputFieldInputProps, {}> {

  private inputRef;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
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


  protected _renderInput() {
    const { labelLayoutWidth, centerInputField, staticField, defaultValue, type } = this.props;

    const inputLayoutWidth = labelLayoutWidth === 'fill' ? 'fit' : staticField || type === 'checkbox' ? 'fit' : 'fill';
    const inputLayoutClasses = classNames(`layout__item u-${inputLayoutWidth} layout__item--middle`, { 'text-center': centerInputField });

    return <div className={inputLayoutClasses}>
      <div className="input-container layout layout--gutter-xs">
        <div className="layout__item u-fill">
          {this._renderInputElement()}
        </div>
        {this._renderPostInputElement()}
      </div>

      {staticField && this._renderStaticValue(type, defaultValue)}
    </div>
  }

  protected _renderInputElement(): React.ReactNode {
    const { id, type, min, max, placeholder, selectActiveOptionValue, selectOptions,
      defaultValue, imageSize, staticField, imageShape, tagSuggestions, focusOnLoad,
      showValidationError, onChangeHandler, children } = this.props;

    const classes = classNames('input', { 'error': showValidationError })

    if (type === 'children') {
      return children;
    }
    if (type === 'textarea') {
      return (
        <textarea
          id={id}
          name={id}
          onChange={(e) => onChangeHandler(e.target.value)}
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
          onChangeHandler={onChangeHandler}
          activeOptionValue={selectActiveOptionValue}
          options={selectOptions}
          error={showValidationError}
        />
      )
    }
    if (type === 'checkbox') {
      return (
        <Checkbox
          id={id}
          onChangeHandler={onChangeHandler}
          defaultValue={defaultValue === true}
          disabled={staticField}
        />
      )
    }
    if (type === 'image') {
      return (
        <ImageUpload size={imageSize}
          defaultURL={defaultValue ? defaultValue.toString() : null}
          onFileSelection={onChangeHandler}
          shape={imageShape}
        />
      )
    }
    if (type === 'date') {
      return (
        <DatePicker
          id={id}
          onChangeHandler={onChangeHandler}
          defaultDate={defaultValue ? defaultValue.toString() : null}
          error={showValidationError}
        />
      )
    }
    if (type === 'tags') {
      return <TagsSelector
        onChangeHandler={onChangeHandler}
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
        onChangeHandler={onChangeHandler}
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
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder={placeholder}
        ref={this.inputRef}
      />
    )
  }

  protected _renderStaticValue(type: InputFieldInputType, value: InputFieldInputValue): JSX.Element | React.ReactNode | InputFieldInputValue {
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
      return this._renderInputElement();
    }

    return value
  }

  protected _renderPostInputElement() {
    const { required } = this.props;

    if (required) {
      return <div className="layout__item u-fit input-field__field-addition">
        <RequiredIcon />
      </div>
    }
    return null;
  }

  protected _renderChildren(): JSX.Element {
    const { type, children } = this.props;

    if (type !== 'children' && children) {
      return <div className="layout__item u-fit">
        {children}
      </div>
    }
    return null;
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        {this._renderInput()}
        {this._renderChildren()}
      </React.Fragment>
    )
  };
};

export default InputFieldInput;