import * as React from 'react';
import classNames from 'classnames';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';

export interface TextFieldProps extends  InputFieldProps {
    type: 'text' | 'password' | 'email' | 'url';
}

const TextField: React.StatelessComponent<TextFieldProps> = ({
    id, type, placeholder, value, showValidationError, onChangeHandler, inputRef, ...props
}) => {
    const textField = () =>
        <input
            id={id}
            className={classNames('input', {'error': showValidationError})}
            name={id}
            type={type}
            onChange={(e) => onChangeHandler(id, e.target.value)}
            placeholder={placeholder}
            value={value != null ? value.toString() : ''}
            ref={inputRef}
        />;
    const staticTextField = () => {
        switch (type) {
            case "email":
                return <a href={`mailto:${value}`} target="_top">{value}</a>;
            case "url":
                return <a href={value.toString()} target="_blank">{value}</a>;
            case "password":
                return <React.Fragment>{"*".repeat(typeof(value) === "string" ? value.length : 0)}</React.Fragment>;
            default:
                return <React.Fragment>{value}</React.Fragment>;
        }
    }
    return <InputFieldWrapper {...props} staticRender={staticTextField()}>{textField()}</InputFieldWrapper>
}

TextField.displayName = "TextField";

export default TextField;
