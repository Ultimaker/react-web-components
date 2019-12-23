// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import DefaultInputField from './default_input_field';
import { InputFieldProps } from './input_field_wrapper';


export interface NumberFieldProps extends InputFieldProps {
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

export const NumberField: React.FC<NumberFieldProps> = ({
    value, onChangeHandler, focusOnLoad, placeholder, children, ...wrapperProps
}) => (
    <DefaultInputField
        type="number"
        value={value || value === 0 ? value.toString() : null}
        onChangeHandler={(id, val) => onChangeHandler(id, val ? parseFloat(val) : null)}
        inputChildren={children}
        {...wrapperProps}
    >
        {wrapperProps.staticField && value}
    </DefaultInputField>
);

NumberField.displayName = 'NumberField';

export default NumberField;
