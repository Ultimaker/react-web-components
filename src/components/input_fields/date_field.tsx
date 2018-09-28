import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'
import DatePicker from '../date_picker'


export const DateField: React.StatelessComponent<InputFieldProps> = ({}) => <div />

        private _renderDatePicker() {
            const {id, showValidationError, value, onChangeHandler} = this.props;

            return <DatePicker
                id={id}
                onChangeHandler={onChangeHandler}
                value={value != null ? value.toString() : null}
                error={showValidationError}
            />
        }

        private _renderStaticDate() {
            const {value} = this.props;
            if (typeof value === 'string') {
                return moment(value).format('DD-MM-YYYY');
            }
            return null;
        }

export default InputFieldWrapper(DateField)
