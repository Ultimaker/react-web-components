// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';


export interface ChildrenFieldProps extends InputFieldProps {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched?: boolean;
    /** Children are required and must include the input field both in static and non-static mode. */
    children: any;
}

/**
 * Input field that simply renders its children. It should not be used anymore with the new field setup.
 * @param children - The children to render.
 * @param touched - Whether the field has been touched. Set to true to show validation errors.
 * @param wrapperProps - The props to be passed to the input field wrapper.
 * @constructor
 * @deprecated
 */
export const ChildrenField: React.StatelessComponent<ChildrenFieldProps> = ({ children, touched, ...wrapperProps }) => (
<InputFieldWrapper inputChildren={null} touched={touched} {...wrapperProps}>
        {children}
    </InputFieldWrapper>
)export default ChildrenField;
