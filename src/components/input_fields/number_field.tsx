import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'



    /** Minimum value for number field */
    min?: number;
    /** Maximum value for number field */
    max?: number;

function _parseValue(value: string | number): number {
    if (typeof value === 'string') {
        return value.length ? parseFloat(value) : null;
    }
    return value;
}

const NumberField: React.StatelessComponent<InputFieldProps> = ({
    id, min, max, placeholder, value, showValidationError, onChangeHandler, inputRef
}) =>
    <input
        id={id}
        className={classNames('input', {'error': showValidationError})}
        name={id}
        type="number"
        min={min ? min : null}
        max={max ? max : null}
        onChange={(e) => onChangeHandler(id, _parseValue(e.target.value))}
        placeholder={placeholder}
        value={value != null ? value.toString() : ''}
        ref={inputRef}
    />


export default InputFieldWrapper(NumberField)
