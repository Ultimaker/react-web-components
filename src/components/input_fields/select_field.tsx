import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'
import {SelectList, SelectOption} from '../select_list'

    /** List of options for type select */
    selectOptions?: SelectOption[];

const SelectField: React.StatelessComponent<InputFieldProps> = (
    {id, selectOptions, value, onChangeHandler, showValidationError}
) =>
    <SelectList
        id={id}
        onChangeHandler={value => onChangeHandler(id, value)}
        value={typeof value === 'number' || typeof value === 'string' ? value : null}
        options={selectOptions}
        error={showValidationError}
    />

        private _renderStaticSelectList() {
            const {value, selectOptions} = this.props;
            const option = selectOptions.find(option => option.value === value);
            return option ? option.label : null;
        }

SelectField.displayName = "SelectField";

export default InputFieldWrapper(SelectField);
