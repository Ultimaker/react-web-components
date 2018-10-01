// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';


export interface ChildrenFieldProps extends InputFieldProps {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched?: boolean;
}

export const ChildrenField: React.StatelessComponent<ChildrenFieldProps> = ({children, touched, ...wrapperProps}) =>
    <InputFieldWrapper touched={touched} {...wrapperProps}>
        {children}
    </InputFieldWrapper>

export default ChildrenField;
