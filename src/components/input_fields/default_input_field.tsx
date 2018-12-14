// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';

export interface DefaultInputFieldProps extends InputFieldProps {
    /** Type of the input field */
    type?: 'text' | 'password' | 'email' | 'url' | 'number';
    /** Input field value */
    value: string | null;
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

    /** Maximum amount of characters allowed in the field */
    maxLength?: number;

    /**
     * Any other children passed inside the input field are rendered separately
     * and should be passed in this prop
     */
    inputChildren: any;

    /** Optional reference object in case the caller wants more control of the input's focus */
    inputRef?: React.RefObject<HTMLInputElement>;
}

export interface DefaultInputFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a HTML input component.
 */
class DefaultInputField extends React.Component<DefaultInputFieldProps, DefaultInputFieldState> {
    /** A reference object to set the focus on load if required */
    private readonly _inputRef: React.RefObject<HTMLInputElement> =
        React.createRef<HTMLInputElement>();

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
        const { focusOnLoad } = this.props;
        if (this._inputRef.current && focusOnLoad) {
            this._inputRef.current.focus();
        }
    }

    private _onChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { onChangeHandler, id } = this.props;
        this.setState({ touched: true });
        onChangeHandler(id, e.target.value === '' ? null : e.target.value);
    }

    render() {
        const {
            type, value, placeholder, min, max, maxLength, children,
            inputChildren, inputRef, ...wrapperProps
        } = this.props;
        const {
            id, validationError, submitted, staticField,
        } = wrapperProps;
        const { touched } = this.state;
        return (
            <InputFieldWrapper touched={touched} inputChildren={inputChildren} {...wrapperProps}>
                {!staticField && (
                    <input
                        id={id}
                        className={classNames('input', { error: validationError && (touched || submitted) })}
                        name={id}
                        type={type}
                        min={min || null}
                        max={max || null}
                        maxLength={maxLength}
                        onChange={this._onChange}
                        placeholder={placeholder}
                        value={value || ''}
                        ref={inputRef || this._inputRef}
                    />
                )}
                {children}
            </InputFieldWrapper>
        );
    }
}

export default DefaultInputField;
