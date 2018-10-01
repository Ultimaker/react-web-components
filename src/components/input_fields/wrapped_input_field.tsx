// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import {RefObject} from 'react';

export interface WrappedInputFieldProps extends InputFieldProps {
    /** Type of the input field */
    type?: 'text' | 'password' | 'email' | 'url' | 'number';
    /** Input field value */
    value: string;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string) => any;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** html placeholder text */
    placeholder?: string;

    /** Minimum value for number field */
    min?: number;
    /** Maximum value for number field */
    max?: number;

    /** The children are used in the static view only! Defaults to props.value. **/
    children?: any;
}

export interface WrappedInputFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a HTML input component.
 * The children passed are used only in the static view!
 */
class WrappedInputField extends React.Component<WrappedInputFieldProps, WrappedInputFieldState> {
    /** A reference object to set the focus on load if required **/
    private readonly _inputRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    state = {
        touched: false,
    }

    static defaultProps = {
        type: 'text',
    }

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount(): void {
        this._focusOnPromptInput();
    }

    private _focusOnPromptInput(): void {
        const {focusOnLoad} = this.props;
        if (this._inputRef.current && focusOnLoad) {
            this._inputRef.current.focus();
        }
    }

    private _onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({touched: true});
        this.props.onChangeHandler(this.props.id, e.target.value === '' ? null : e.target.value);
    }

    render() {
        const {type, value, placeholder, min, max, children, ...wrapperProps} = this.props;
        const {id, validationError, submitted, staticField} = wrapperProps;
        const {touched} = this.state;
        return <InputFieldWrapper touched={touched} {...wrapperProps}>{
            staticField ? children || value :
            <input
                id={id}
                className={classNames('input', {'error': validationError && (touched || submitted)})}
                name={id}
                type={type}
                min={min ? min : null}
                max={max ? max : null}
                onChange={this._onChange}
                placeholder={placeholder}
                value={value != null ? value.toString() : ''}
                ref={this._inputRef}
            />
        }</InputFieldWrapper>;
    }
}

export default WrappedInputField;
