// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';
import DatePicker from '../date_picker';

import moment = require('moment');

/**
 * The date field provides these props in addition to those supported by all input fields.
 */
export interface DateFieldProps extends InputFieldProps {
    /** The date currently selected */
    value: string;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string) => any;
    /** The format to display the date, as specified by moment-js */
    format?: string;
    /** Placeholder text */
    placeholder?: string;
}

/**
 * The date field keeps track of whether it has been touched.
 */
export interface DateFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a DatePicker component.
 * TODO: merge DateField and DatePicker?
 */
export class DateField extends React.Component<DateFieldProps, DateFieldState> {
    state = {
        touched: false,
    };

    static defaultProps = {
        format: DatePicker.defaultProps.format,
        placeholder: DatePicker.defaultProps.placeholder,
    };

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(value: string): void {
        const { onChangeHandler, id } = this.props;
        this.setState({ touched: true });
        onChangeHandler(id, value);
    }

    render() {
        const {
            value, format, placeholder, children, ...wrapperProps
        } = this.props;
        const {
            id, staticField, validationError, submitted,
        } = wrapperProps;
        const { touched } = this.state;
        return (
            <InputFieldWrapper inputChildren={children} touched={touched} {...wrapperProps}>
                {staticField
                    ? typeof value === 'string' && moment(value).format(format)
                    : (
                        <DatePicker
                            id={id}
                            onChangeHandler={this._onChange}
                            value={value != null ? value.toString() : null}
                            error={validationError && (touched || submitted)}
                            format={format}
                            placeholder={placeholder}
                        />
                    )}
            </InputFieldWrapper>
        );
    }
}

export default DateField;
