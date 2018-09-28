import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'
import Checkbox from '../checkbox'


export const CheckboxField: React.StatelessComponent<InputFieldProps> = (
    {id, staticField, value, onChangeHandler}
) =>
    <Checkbox
        id={id}
        onChangeHandler={value => onChangeHandler(id, value)}
        value={value === true}
        disabled={staticField}
    />

export default InputFieldWrapper(CheckboxField)
