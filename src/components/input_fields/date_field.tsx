import * as React from 'react';

import InputFieldWrapper, {InputFieldProps, StaticFieldProps} from './input_field_wrapper';
import DatePicker from '../date_picker';
import moment = require('moment');

export const DateField: React.StatelessComponent<InputFieldProps> = (
    {id, showValidationError, value, onChangeHandler}
) =>
    <DatePicker
        id={id}
        onChangeHandler={date => onChangeHandler(id, date)}
        value={value != null ? value.toString() : null}
        error={showValidationError}
    />;

DateField.displayName = "DateField";

export interface StaticDateFieldProps extends StaticFieldProps {
    format: string;
}

export const StaticDateField: React.StatelessComponent<StaticDateFieldProps> = ({value, format}) =>
    <React.Fragment>{typeof value === 'string' &&  moment(value).format(format)}</React.Fragment>

StaticDateField.defaultProps = {
    format: 'DD-MM-YYYY',
};
StaticDateField.displayName = "StaticDateField";

export default InputFieldWrapper(DateField, StaticDateField);
