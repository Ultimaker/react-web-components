import * as React from 'react'

import InputFieldWrapper, {InputFieldProps, StaticFieldProps} from './input_field_wrapper'
import {SelectList, SelectOption} from '../select_list'

interface BaseSelectFieldProps {
    /** List of options for type select */
    selectOptions?: SelectOption[];
}

interface SelectFieldProps extends InputFieldProps, BaseSelectFieldProps {}

const SelectField: React.StatelessComponent<SelectFieldProps> = (
    {id, selectOptions, value, onChangeHandler, showValidationError}
) =>
    <SelectList
        id={id}
        onChangeHandler={value => onChangeHandler(id, value)}
        value={typeof value === 'number' || typeof value === 'string' ? value : null}
        options={selectOptions}
        error={showValidationError}
    />

interface StaticSelectFieldProps extends StaticFieldProps, BaseSelectFieldProps {}

const StaticSelectField: React.StatelessComponent<StaticSelectFieldProps> = (
    {value, selectOptions}
) => {
    const option = selectOptions.find(option => option.value === value);
    return <React.Fragment>{option ? option.label : null}</React.Fragment>;
}

StaticSelectField.displayName = "StaticSelectField";

export default InputFieldWrapper(SelectField, StaticSelectField);
