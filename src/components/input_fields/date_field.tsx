// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';
import DatePicker from 'react-date-picker';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';
import i18n from '../../utils/i18n';

/**
 * The date field provides these props in addition to those supported by all input fields.
 */
export interface DateFieldProps extends InputFieldProps {
    /** Called when a date is selected */
    onChangeHandler: (id: string, value: string) => any;
    /** String date value to pre-fill or change the DatePicker date */
    value?: string;
    /** DatePicker id. Must be unique */
    id: string;
    /** When true the error state will be displayed */
    error?: boolean;
    /** Location locale, defaults to browser settings */
    locale?: string;
    /** Defines maximum date that the user can select */
    maxDate?: string;
    /** Defines minimum date that the user can select */
    minDate?: string;
}

/**
 * The date field keeps track of whether it has been touched.
 */
export interface DateFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

export class DateField extends React.Component<DateFieldProps, DateFieldState> {
    private static _convertISODateToDate(isoDate: string): Date {
        return isoDate ? new Date(isoDate) : null;
    }

    private static _convertDateToISODate(date: Date): string {
        return date ? date.toISOString() : null;
    }

    private static _convertDateToString(date: Date, locale: string): string {
        return date ? date.toLocaleDateString(locale) : null;
    }

    state = {
        touched: false,
    };

    constructor(props) {
        super(props);
        
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(date: Date): void {
        const { onChangeHandler, id } = this.props;
        this.setState({ touched: true });
        const value = DateField._convertDateToISODate(date);
        onChangeHandler(id, value);
    }

    render() {
        const {
            value, locale, maxDate, minDate, children, ...wrapperProps
        } = this.props;
        const {
            id, staticField, validationError, submitted,
        } = wrapperProps;
        const { touched } = this.state;

        const classes = classNames('date-picker', { error: validationError && (touched || submitted) });

        const updatedLocale = locale || i18n.getLocale();

        const date = DateField._convertISODateToDate(value);
        const staticDate = DateField._convertDateToString(date, updatedLocale);

        return (
            <InputFieldWrapper inputChildren={children} touched={touched} {...wrapperProps}>
                {staticField
                    ? staticDate
                    : (
                        <div className={classes} id={id}>
                            <DatePicker
                                locale={updatedLocale}
                                clearIcon={null}
                                calendarIcon={null}
                                onChange={this._onChange}
                                value={date}
                                maxDate={DateField._convertISODateToDate(maxDate)}
                                minDate={DateField._convertISODateToDate(minDate)}
                            />
                        </div>
                    )}
            </InputFieldWrapper>
        );
    }
}

export default DateField;
