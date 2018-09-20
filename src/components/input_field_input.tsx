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
import Textarea from './textarea';

export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'tags' | 'children';
export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';
export type InputFieldInputValue = string | number | boolean | ImageFile | string[] | HTMLInputElement;

export interface InputFieldInputProps {
    /** Input field type: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' | 'image' | 'date' | 'file' | 'children' */
    type: InputFieldType;
    /** Input field id. Must be unique */
    id: string;
    /** Input field will be centered if true. Useful for type image or checkbox */
    centerInputField?: boolean;
    /** Called when the field changes */
    onChangeHandler: (value: InputFieldInputValue) => void;
    /** Input field value */
    value: InputFieldInputValue;
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
    /** Whether the validation error should be shown */
    showValidationError: boolean
    /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
    labelLayoutWidth: LayoutWidth;
    /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
    labelWidthBreakpoint: Breakpoint;
    /** Whether the textarea should grow horizontally with user input */
    textareaAutoGrow?: boolean;
}

export class InputFieldInput extends React.Component<InputFieldInputProps, {}> {

    private _inputRef;

    constructor(props) {
        super(props);
        this._inputRef = React.createRef();
    }

    componentDidMount(): void {
        this._focusOnPromptInput();
    }

    private _focusOnPromptInput(): void {
        const { focusOnLoad } = this.props;

        if (this._inputRef.current && focusOnLoad) {
            this._inputRef.current.focus();
        }
    }


    private _renderInput() {
        const { labelLayoutWidth, centerInputField, staticField, value, type } = this.props;

        const inputLayoutWidth = labelLayoutWidth === 'fill' ? 'fit' : staticField || type === 'checkbox' ? 'fit' : 'fill';
        const inputLayoutClasses = classNames(`layout__item u-${inputLayoutWidth} layout__item--middle`, { 'text-center': centerInputField });

        return <div className={inputLayoutClasses}>

            {!staticField &&
                <div className="input-container layout layout--gutter-xs">
                    <div className="layout__item u-fill">
                        {this._renderInputElement()}
                    </div>
                    {this._renderPostInputElement()}
                </div>
            }

            {staticField && this._renderStaticValue()}
        </div>
    }

    private _renderInputElement(): React.ReactNode {
        const { type, children } = this.props;

        switch (type) {
            case 'children':
                return children;
            case 'textarea':
                return this._renderTextarea();
            case 'select':
                return this._renderSelectList();
            case 'checkbox':
                return this._renderCheckbox();
            case 'image':
                return this._renderImageUpload();
            case 'date':
                return this._renderDatePicker();
            case 'tags':
                return this._renderTagsSelector();
            case 'file':
                return this._renderFileUpload();
            default:
                return this._renderDefaultInput();
        }
    }

    private _renderTextarea() {
        const { id, placeholder, value, focusOnLoad, onChangeHandler, textareaAutoGrow } = this.props;

        return <Textarea
            id={id}
            onChangeHandler={onChangeHandler}
            placeholder={placeholder}
            value={value != null ? value.toString() : ''}
            autofocus={focusOnLoad}
            autoGrow={textareaAutoGrow}
        />
    }

    private _renderSelectList() {
        const { id, selectOptions, value, onChangeHandler, showValidationError } = this.props;

        return <SelectList
            id={id}
            onChangeHandler={onChangeHandler}
            value={typeof value === 'number' || typeof value === 'string' ? value : null}
            options={selectOptions}
            error={showValidationError}
        />
    }

    private _renderCheckbox() {
        const { id, staticField, value, onChangeHandler } = this.props;

        return <Checkbox
            id={id}
            onChangeHandler={onChangeHandler}
            value={value === true}
            disabled={staticField}
        />
    }

    private _renderImageUpload() {
        const { id, imageSize, imageShape, placeholder, value, onChangeHandler } = this.props;

        return <ImageUpload
            id={id}
            size={imageSize}
            imageURL={value != null ? value.toString() : null}
            onFileSelection={onChangeHandler}
            shape={imageShape}
            placeholderLabel={placeholder}
        />
    }

    private _renderDatePicker() {
        const { id, showValidationError, value, onChangeHandler } = this.props;

        return <DatePicker
            id={id}
            onChangeHandler={onChangeHandler}
            value={value != null ? value.toString() : null}
            error={showValidationError}
        />
    }

    private _renderTagsSelector() {
        const { id, placeholder, value, onChangeHandler, tagSuggestions, staticField, focusOnLoad } = this.props;

        return <TagsSelector
            id={id}
            onChangeHandler={onChangeHandler}
            placeholder={placeholder}
            suggestions={tagSuggestions}
            value={Array.isArray(value) && value}
            disabled={staticField}
            autofocus={focusOnLoad}
        />
    }

    private _renderFileUpload() {
        const { id, onChangeHandler, staticField } = this.props;

        return <FileUpload
            id={id}
            onChangeHandler={onChangeHandler}
            disabled={staticField}
        />
    }

    private _renderDefaultInput() {
        const { id, type, min, max, placeholder, value,
            showValidationError, onChangeHandler } = this.props;

        const classes = classNames('input', { 'error': showValidationError });

        return <input
            id={id}
            className={classes}
            name={id}
            type={type}
            min={min ? min : null}
            max={max ? max : null}
            onChange={(e) => onChangeHandler(e.target.value)}
            placeholder={placeholder}
            value={value != null ? value.toString() : ''}
            ref={this._inputRef}
        />
    }

    private _renderStaticValue(): JSX.Element | React.ReactNode | InputFieldInputValue {
        const { type, value } = this.props;

        switch (type) {
            case 'url':
                return this._renderStaticUrl();
            case 'email':
                return this._renderStaticEmail();
            case 'date':
                return this._renderStaticDate();
            case 'select':
                return this._renderStaticSelectList();
            case 'image':
                return this._renderStaticImage();
            case 'checkbox':
            case 'tags':
                return this._renderInputElement();
            default:
                return value;
        }
    }

    private _renderStaticUrl() {
        const { value } = this.props;
        return <a href={value.toString()} target="_blank">{value}</a>
    }

    private _renderStaticEmail() {
        const { value } = this.props;
        return <a href={`mailto:${value}`} target="_top">{value}</a>
    }

    private _renderStaticDate() {
        const { value } = this.props;
        if (typeof value === 'string') {
            return moment(value).format('DD-MM-YYYY');
        }
        return null;
    }

    private _renderStaticSelectList() {
        const { value, selectOptions } = this.props;
        const option = selectOptions.find(option => option.value === value);
        return option ? option.label : null;
    }

    private _renderPostInputElement() {
        const { required } = this.props;

        if (required) {
            return <div className="layout__item u-fit input-field__field-addition">
                <RequiredIcon />
            </div>
        }
        return null;
    }

    private _renderStaticImage() {
        const { value, imageSize, imageShape } = this.props;
        return <Image src={value ? value.toString() : null} size={imageSize} shape={imageShape} />
    }

    private _renderChildren(): JSX.Element {
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
