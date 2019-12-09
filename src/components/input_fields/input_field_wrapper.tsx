// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';

import InputFieldLabel from './input_field_label';
import InputFieldValidation from './input_field_validation';
import RequiredIcon from '../icons/required_icon';
import { Breakpoint, LayoutWidth } from '../../utils/layout_constants';

/**
 * The props in this interface are available in all the input fields.
 * They are used in the input field wrapper to define how the input field will look like.
 */
export interface InputFieldProps {
    /** Input field id. Must be unique */
    id: string;
    /** If true, the defaultValue is shown as plain text and the input hidden */
    staticField?: boolean;

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
    /** The URL of the link to be shown next to the input field */
    infoLinkURL?: string;
    /** Description of the fields to be shown in a tooltip */
    infoText?: string;
    /** JSX Element, such as an icon, to be shown before the input label */
    preLabelElement?: JSX.Element | string;
    /** Displays the required icon when true */
    required?: boolean;
    /** Whether the form has been submitted. This will be set by the Form component */
    submitted?: boolean;
    /**
     * Message to show for the validation error.
     * It should be translated. Can be JSX.Element[] if returned from I18n.interpolateElements
     */
    validationError?: string | JSX.Element[];
    /** Allow autocomplete or not. Can be "on" or "off". NOTE: True and false do not work. */
    autocomplete: string;
}

/**
 * The input field wrapper has also some properties
 * that must be passed by the input fields themselves.
 */
export interface InputFieldWrapperProps extends InputFieldProps {
    /**
     * Indicates if the field has been touched (changed)
     * or not from the default value.
     */
    touched: boolean;
    /**
     * Children are required and must include the
     * input field both in static and non-static mode.
     */
    children: any;
    /**
     * Any other children passed inside the input field are
     * rendered separately and should be passed in this prop
     */
    inputChildren: any;
}

export class InputFieldWrapper extends React.Component<InputFieldWrapperProps, {}> {
    static defaultProps = {
        labelLayoutWidth: '1/1',
        labelWidthBreakpoint: 'sm',
        staticField: false,
    };

    constructor(props) {
        super(props);

        this._showValidationError = this._showValidationError.bind(this);
    }

    private _showValidationError(): boolean {
        const { validationError, submitted, touched } = this.props;
        return validationError && (touched || submitted);
    }

    private _renderLabel(): JSX.Element {
        const {
            id, label, labelLayoutWidth, labelWidthBreakpoint,
            preLabelElement, infoText, infoLinkURL,
        } = this.props;

        if (label || preLabelElement) {
            return (
                <InputFieldLabel
                    id={id}
                    label={label}
                    labelLayoutWidth={labelLayoutWidth}
                    labelWidthBreakpoint={labelWidthBreakpoint}
                    preLabelElement={preLabelElement}
                    infoText={infoText}
                    infoLinkURL={infoLinkURL}
                />
            );
        }
        return null;
    }

    private _renderValidation(): JSX.Element {
        const {
            validationError, labelLayoutWidth, labelWidthBreakpoint, required,
        } = this.props;

        if (this._showValidationError()) {
            return (
                <InputFieldValidation
                    validationError={validationError}
                    labelLayoutWidth={labelLayoutWidth}
                    labelWidthBreakpoint={labelWidthBreakpoint}
                    required={required}
                />
            );
        }
        return null;
    }

    private _renderInputChildren(): JSX.Element {
        const { inputChildren } = this.props;
        const displayChildren = React.Children.toArray(inputChildren).length > 0;

        if (displayChildren) {
            return (
                <div className="layout__item u-fit input-children">
                    {inputChildren}
                </div>
            );
        }
        return null;
    }

    private _renderInput() {
        const {
            labelLayoutWidth, centerInputField, staticField, className, children,
        } = this.props;

        const inputLayoutWidth = staticField || labelLayoutWidth === 'fill' ? 'fit' : 'fill';
        const inputLayoutClasses = classNames(
            `layout__item u-${inputLayoutWidth} layout__item--middle`,
            className,
            { 'text-center': centerInputField },
        );

        return (
            <div className={inputLayoutClasses}>
                {!staticField && (
                    <div className="input-container layout layout--gutter-xs">
                        <div className="input-wrapper-children layout__item u-fill">
                            {children}
                        </div>
                        {this._renderPostInputElement()}
                    </div>
                )}

                {staticField && <div className="static-field">{children}</div>}
            </div>
        );
    }

    private _renderPostInputElement() {
        const { required } = this.props;
        if (required) {
            return (
                <div className="layout__item u-fit input-field__field-addition">
                    <RequiredIcon />
                </div>
            );
        }
        return null;
    }

    render(): JSX.Element {
        const { className, staticField } = this.props;

        const inputClasses = classNames('input-field layout', className, { 'hide-input': staticField });
        return (
            <div className={inputClasses}>
                {this._renderLabel()}
                {this._renderInput()}
                {this._renderInputChildren()}
                {this._renderValidation()}
            </div>
        );
    }
}

export default InputFieldWrapper;
