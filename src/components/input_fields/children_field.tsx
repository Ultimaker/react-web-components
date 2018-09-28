import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'


export const ChildrenField: React.StatelessComponent<InputFieldProps> = ({}) => <div />

export default InputFieldWrapper(ChildrenField)
