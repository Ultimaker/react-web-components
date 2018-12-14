import * as React from 'react';
import classNames from 'classnames';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import moment = require('moment');

export interface DatePickerProps {
    /** Called when a date is selected */
    onChangeHandler: (date: string) => void;
    /** String date value to pre-fill or change the DatePicker date */
    value?: string;
    /** DatePicker id. Must be unique */
    id: string;
    /** Placeholder text */
    placeholder?: string;
    /** When true the error state will be displayed */
    error?: boolean;
    /** The format to display the date, as specified by moment-js */
    format: string;
    /** When true, dates from before the current date can be selected */
    allowPastDates?: boolean;
}

export interface DatePickerState {
    focused: boolean;
    date: moment.Moment;
}

export interface FocusedObj {
    focused: boolean;
}

export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    static defaultProps = {
        placeholder: '',
        format: 'DD-MM-YYYY',
    };

    state = {
        focused: false,
        date: undefined,
    }

    constructor(props: DatePickerProps) {
        super(props);
        this._onFocused = this._onFocused.bind(this);
    }

    static getDerivedStateFromProps(
        props: DatePickerProps,
        state: DatePickerState,
    ): Partial<DatePickerState> {
        if (props.value && state.date === undefined) {
            // allow date to be set initially to the props value
            return {
                date: moment(props.value),
            };
        }

        if (props.value && state.date && moment(props.value) !== state.date) {
            // after the first time, only set date to the props value if date is not null,
            // this is to avoid issues when the user types in the date manually
            return {
                date: moment(props.value),
            };
        }

        return null;
    }

    private _onChangeHandler(date: moment.Moment): void {
        const { onChangeHandler } = this.props;
        // if date is invalid it will be set to null
        this.setState({ date });

        if (date) {
            // only call onChangeHandler when the date is valid
            onChangeHandler(moment(date).utc().format());
        }
    }

    private _onFocused(focusedObj: FocusedObj): void {
        this.setState({ focused: focusedObj.focused });
    }

    render(): JSX.Element {
        const {
            id, placeholder, error, format, allowPastDates,
        } = this.props;
        const { date, focused } = this.state;

        const classes = classNames('date-picker', { error });

        return (
            <div className={classes}>
                <SingleDatePicker
                    date={date}
                    onDateChange={newDate => this._onChangeHandler(newDate)}
                    focused={focused}
                    onFocusChange={this._onFocused}
                    id={id}
                    placeholder={placeholder}
                    noBorder
                    hideKeyboardShortcutsPanel
                    numberOfMonths={1}
                    anchorDirection="left"
                    displayFormat={format}
                    enableOutsideDays
                    isOutsideRange={allowPastDates ? () => false : undefined}
                />
            </div>
        );
    }
}

export default DatePicker;
