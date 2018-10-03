// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import {InputFieldProps} from './input_field_wrapper';
import WrappedInputField from './wrapped_input_field';

export type TextFieldType = 'text' | 'password' | 'email' | 'url';

export interface TextFieldProps extends InputFieldProps {
    /** Type of the input field */
    type?: TextFieldType;
    /** Input field value */
    value: string | null;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string) => any;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** html placeholder text */
    placeholder?: string;
}

/**
 * Renders the input field's value in static mode.
 * @param type - The type of field.
 * @param value - The value of the field.
 */
function staticRender(type: TextFieldType, value: string): JSX.Element | string {
    switch (type) {
        case "email":
            return <a href={`mailto:${value}`} target="_top">{value}</a>;
        case "url":
            return <a href={value} target="_blank">{value}</a>;
        case "password":
            return "*".repeat(value.length);
        default:
            return value;
    }
}

/**
 * The text field is a normal HTML input field that includes all the standard wrapping.
 * @param wrapperProps - The properties to be passed to the wrapper.
 * @param children - Any extra children to be displayed after the text.
 * @constructor
 */
const TextField: React.StatelessComponent<TextFieldProps> = ({
    children, ...wrapperProps
}) =>
    <WrappedInputField {...wrapperProps}>
        {wrapperProps.staticField && wrapperProps.value && staticRender(wrapperProps.type, wrapperProps.value)}
        {children}
    </WrappedInputField>;

TextField.displayName = "TextField";
TextField.defaultProps = {
    type: 'text',
};

export default TextField;
