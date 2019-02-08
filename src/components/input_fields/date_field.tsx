// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';
import DatePicker from 'react-date-picker';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';

/**
 * The date field provides these props in addition to those supported by all input fields.
 */
export interface DateFieldProps extends InputFieldProps {
    /** Called when a date is selected */
    onChangeHandler: (id: string, value: Date) => any;
    /** String date value to pre-fill or change the DatePicker date */
    value?: Date;
    /** DatePicker id. Must be unique */
    id: string;
    /** When true the error state will be displayed */
    error?: boolean;
    /** Location locale, defaults to browser settings */
    locale?: string;
}

/**
 * The date field keeps track of whether it has been touched.
 */
export interface DateFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

export class DateField extends React.Component<DateFieldProps, DateFieldState> {
    state = {
        touched: false,
    };

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(value: Date): void {
        const { onChangeHandler, id } = this.props;
        this.setState({ touched: true });
        onChangeHandler(id, value);
    }

    render() {
        const {
            value, locale, children, ...wrapperProps
        } = this.props;
        const {
            id, staticField, validationError, submitted,
        } = wrapperProps;
        const { touched } = this.state;

        const classes = classNames('date-picker', { error: validationError && (touched || submitted) });

        return (
            <InputFieldWrapper inputChildren={children} touched={touched} {...wrapperProps}>
                {staticField
                    ? value.toLocaleDateString(locale)
                    : (
                        <div className={classes} id={id}>
                            <DatePicker
                                locale={locale}
                                clearIcon={null}
                                calendarIcon={null}
                                onChange={this._onChange}
                                value={value}
                            />
                        </div>
                    )}
            </InputFieldWrapper>
        );
    }
}

export default DateField;
