import * as React from 'react';
import classNames from 'classnames';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import * as moment from 'moment';

export interface DatePickerProps {
  onChangeHandler: (date) => void;
  defaultDate?: string;
  id: string;
  placeholder?: string;
  error?: boolean;
}

export interface DatePickerState {
  focused: boolean;
  date: any;
}

export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {

  static defaultProps = {
    placeholder: ''
  };

  state = {
    focused: false,
    date: null
  }

  static getDerivedStateFromProps(props: DatePickerProps, state: DatePickerState): Partial<DatePickerState> {
    if (props.defaultDate && state.date === null) {
      return {
        date: moment(props.defaultDate, 'DD-MM-YYYY')
      }
    }
    return null;
  }

  _onChangeHandler(date) {
    this.setState({ date });
    this.props.onChangeHandler(moment(date).format());
  }

  render(): JSX.Element {
    const { id, placeholder, error } = this.props;
    const { date, focused } = this.state;

    const classes = classNames('date-picker', { error });

    return <div className={classes}>
      <SingleDatePicker
        date={date}
        onDateChange={date => this._onChangeHandler(date)}
        focused={focused}
        onFocusChange={({ focused }) => this.setState({ focused })}
        id={id}
        placeholder={placeholder}
        noBorder
        hideKeyboardShortcutsPanel
        numberOfMonths={1}
        anchorDirection="left"
        displayFormat="DD-MM-YYYY"
        enableOutsideDays
      />
    </div>
  }

}

export default DatePicker;