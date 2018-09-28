import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps, StaticFieldProps} from './input_field_wrapper'

export interface BaseTextFieldProps {
    type: 'text' | 'password' | 'email' | 'url';
}

export interface TextFieldProps extends  InputFieldProps, BaseTextFieldProps {}

const TextField: React.StatelessComponent<TextFieldProps> = ({
    id, type, placeholder, value, showValidationError, onChangeHandler, inputRef
}) =>
    <input
        id={id}
        className={classNames('input', {'error': showValidationError})}
        name={id}
        type={type}
        onChange={(e) => onChangeHandler(id, e.target.value)}
        placeholder={placeholder}
        value={value != null ? value.toString() : ''}
        ref={inputRef}
    />

TextField.displayName = "TextField";

export interface StaticTextFieldProps extends  StaticFieldProps, BaseTextFieldProps {}

const StaticTextField: React.StatelessComponent<StaticTextFieldProps> = ({value, type}) => {
    switch (type) {
        case "email":
            return <a href={`mailto:${value}`} target="_top">{value}</a>
        case "url":
            return <a href={value.toString()} target="_blank">{value}</a>
        case "password":
            return <React.Fragment>{"*".repeat(typeof(value) === "string" ? value.length : 0)}</React.Fragment>
        default:
            return <React.Fragment>{value}</React.Fragment>
    }
}

export default InputFieldWrapper(TextField, StaticTextField)
