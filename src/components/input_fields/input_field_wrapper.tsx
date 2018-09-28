import * as React from 'react';
import classNames from 'classnames';

import InputFieldLabel from './input_field_label';
import InputFieldValidation from './input_field_validation';
import {ImageFile} from '../image_upload'
import RequiredIcon from '../icons/required_icon'
import {RefObject} from 'react'

export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';
export type InputFieldValue = string | number | boolean | ImageFile | string[] | HTMLInputElement;  // TODO: Make this a generic parameter

export interface StaticFieldProps {
    /** Input field value */
    value: InputFieldValue;
}

export interface InputFieldWrapperProps extends StaticFieldProps {
    /** Input field id. Must be unique */
    id: string;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: InputFieldValue) => void;
    /** If true, the defaultValue is shown as plain text and the input hidden */
    staticField?: boolean
    /** Additional classes for styling */
    className?: string;
    /** Input field will be centered if true. Useful for type image or checkbox */
    centerInputField?: boolean;
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
    /** Whether the form has been submitted. This will be set by the Form component */
    submitted?: boolean
    /** Message to show for the validation error. Can be any[] if returned from I18n.format */
    validationError?: string | any[];
    /** Displays the required icon when true */
    required?: boolean
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
}

export interface InputFieldProps extends StaticFieldProps {
    /** Input field id. Must be unique */
    id: string;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: InputFieldValue) => void;
    /** html placeholder text */
    placeholder?: string;
    // TODO: See if we can get rid of this
    inputRef?: RefObject<any>;
    /** Whether the validation error should be shown */
    showValidationError?: boolean;
}

export interface InputFieldWrapperState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

function InputFieldWrapper<T extends InputFieldProps, U extends StaticFieldProps>(
    Field: React.StatelessComponent<T>,
    StaticField?: React.StatelessComponent<U>
): any {  // TODO: improve the return type.
    class Wrapper extends React.Component<InputFieldWrapperProps, InputFieldWrapperState> {
        private readonly _inputRef;

        state = {
            touched: false
        }

        constructor(props) {
            super(props);
            // bind callbacks once
            this._onChangeHandler = this._onChangeHandler.bind(this);
            this._showValidationError = this._showValidationError.bind(this);
            this._inputRef = React.createRef();
        }

        _onChangeHandler(value: InputFieldValue): void {
            this.setState({touched: true});
            const {onChangeHandler, id} = this.props;
            if (value === '') {
                value = null;
            }
            if (onChangeHandler) {
                onChangeHandler(id, value);
            }
        }

        _showValidationError() {
            const {validationError, submitted} = this.props;
            const {touched} = this.state;
            return validationError && (touched || submitted)
        }

        private _renderLabel(): JSX.Element {
            const {id, label, labelLayoutWidth, labelWidthBreakpoint, preLabelElement, infoText, infoLinkURL} = this.props;

            if (label || preLabelElement) {
                return <InputFieldLabel
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

        private _renderValidation(): JSX.Element {
            const {validationError, labelLayoutWidth, labelWidthBreakpoint, required} = this.props;

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
            const {className, staticField} = this.props;

            // TODO: Change CSS rules to use displayName.
            const inputClasses = classNames(`input-field input-field--${Field.displayName} layout`, className, {'hide-input': staticField});

            return (
                <div className={inputClasses}>
                    {this._renderLabel()}
                    {this._renderInput()}
                    {this._renderChildren()}
                    {this._renderValidation()}
                </div>
            )
        };

        componentDidMount(): void {
            this._focusOnPromptInput();
        }

        private _focusOnPromptInput(): void {
            const {focusOnLoad} = this.props;

            if (this._inputRef.current && focusOnLoad) {
                this._inputRef.current.focus();
            }
        }

        private _renderInput() {
            const {
                labelLayoutWidth, centerInputField, staticField, onChangeHandler, validationError, ...fieldProps
            } = this.props;

            // TODO: Move this to CSS.
            const inputLayoutWidth = labelLayoutWidth === 'fill' ? 'fit' : staticField || Field.displayName === 'CheckboxField' ? 'fit' : 'fill';
            const inputLayoutClasses = classNames(`layout__item u-${inputLayoutWidth} layout__item--middle`, {'text-center': centerInputField});

            return <div className={inputLayoutClasses}>
                {!staticField &&
                <div className="input-container layout layout--gutter-xs">
                    <div className="layout__item u-fill">
                        <Field
                            inputRef={this._inputRef}
                            onChangeHandler={this._onChangeHandler}
                            showValidationError={Boolean(validationError)}
                            {...fieldProps}
                        />
                    </div>
                    {this._renderPostInputElement()}
                </div>
                }

                {staticField && StaticField && <StaticField value={this.props.value}/>}
                {staticField && !StaticField && this.props.value}
            </div>
        }

        private _renderPostInputElement() {
            const {required} = this.props;
            if (required) {
                return <div className="layout__item u-fit input-field__field-addition">
                    <RequiredIcon/>
                </div>
            }
            return null;
        }

        private _renderChildren(): JSX.Element {
            const {children} = this.props;

            if (Field.displayName !== 'ChildrenField' && children) {
                return <div className="layout__item u-fit">
                    {children}
                </div>
            }
            return null;
        }
    }
    return Wrapper;
}

export default InputFieldWrapper;
