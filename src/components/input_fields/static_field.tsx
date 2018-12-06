// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import { InputFieldWrapper, InputFieldProps } from './input_field_wrapper';

export interface StaticFieldProps extends InputFieldProps {
    /** Input field value */
    value?: any;
    /** Optional extra elements to be displayed after the input */
    children?: any;
}

/**
 * The static field does not have change handling and simply outputs it's value and children.
 * @constructor
 */
const StaticField: React.StatelessComponent<StaticFieldProps> = ({
    children, staticField, ...wrapperProps
}) => (
    <InputFieldWrapper touched={false} staticField inputChildren={children} {...wrapperProps}>
        {wrapperProps.value}
    </InputFieldWrapper>
);

StaticField.displayName = 'StaticField';

export default StaticField;
