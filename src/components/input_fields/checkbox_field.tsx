import * as React from 'react';

import InputFieldWrapper, {InputFieldProps, StaticFieldProps} from './input_field_wrapper';
import Checkbox from '../checkbox';


export const CheckboxField: React.StatelessComponent<InputFieldProps> = (
    {id, value, onChangeHandler}
) =>
    <Checkbox
        id={id}
        onChangeHandler={value => onChangeHandler(id, value)}
        value={value === true}
        disabled={false}
    />

export const StaticCheckboxField: React.StatelessComponent<StaticFieldProps> = (
    {value}
) =>
    <Checkbox
        id={null}
        onChangeHandler={null}
        value={value === true}
        disabled={true}
    />

export default InputFieldWrapper(CheckboxField, StaticCheckboxField)
