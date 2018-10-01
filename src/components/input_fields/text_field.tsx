// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import {InputFieldProps} from './input_field_wrapper';
import WrappedInputField from './wrapped_input_field';

export interface TextFieldProps extends InputFieldProps {
    type: 'text' | 'password' | 'email' | 'url';
    value: string;
    onChangeHandler: (id: string, value: string) => any;
}

function staticRender(type: string, value: string): JSX.Element | string {
    switch (type) {
        case "email":
            return <a href={`mailto:${value}`} target="_top">{value}</a>;
        case "url":
            return <a href={value.toString()} target="_blank">{value}</a>;
        case "password":
            return "*".repeat(typeof(value) === "string" ? value.length : 0);
        default:
            return value;
    }
}

const TextField: React.StatelessComponent<TextFieldProps> = ({
    ...wrapperProps
}) =>
    <WrappedInputField {...wrapperProps}>
        {staticRender(wrapperProps.type, wrapperProps.value)}
    </WrappedInputField>

TextField.displayName = "TextField";

export default TextField;
