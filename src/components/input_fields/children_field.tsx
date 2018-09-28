import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';


export const ChildrenField: React.StatelessComponent<InputFieldProps> = ({children}) =>
    <React.Fragment>{children}</React.Fragment>

export default InputFieldWrapper(ChildrenField)
