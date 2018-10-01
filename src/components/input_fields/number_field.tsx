// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import WrappedInputField from './wrapped_input_field';
import {InputFieldProps} from './input_field_wrapper';


export interface NumberFieldProps extends  InputFieldProps {
    /** Input field value */
    value: number | null;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: number | null) => any;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** html placeholder text */
    placeholder?: string;
    /** Minimum value for number field */
    min?: number;
    /** Maximum value for number field */
    max?: number;
}

const NumberField: React.StatelessComponent<NumberFieldProps> = ({
    value, onChangeHandler, focusOnLoad, placeholder, ...wrapperProps
}) =>
    <WrappedInputField
        type="number"
        value={value || value === 0 ? value.toString() : null}
        onChangeHandler={(id, val) => onChangeHandler(id, val ? parseFloat(val) : null)}
        {...wrapperProps}
    />


export default NumberField
