// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import DatePicker from 'react-date-picker';

// component
import DateField, { DateFieldProps } from '../date_field';
import InputFieldWrapper from '../input_field_wrapper';

describe('The date field component', () => {
    let props: DateFieldProps;
    let wrapper;
    const testDate = new Date(0);
    const testMinDate = new Date(0);
    const testMaxDate = new Date(1);

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: testDate,
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            locale: 'en-GB',
        };
        wrapper = shallow(<DateField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a date picker', () => {
        expect(wrapper.find(DatePicker).props()).toEqual({
            calendarIcon: null,
            clearIcon: null,
            onChange: wrapper.instance()._onChange,
            value: testDate,
            isOpen: null,
            locale: 'en-GB',
            returnValue: 'start',
        });
    });

    it('should render an empty date', () => {
        wrapper.setProps({ value: null });
        expect(wrapper.find(DatePicker).prop('value')).toBeNull();
    });

    it('should render a static date', () => {
        wrapper.setProps({ staticField: true });
        expect(wrapper.find(DatePicker)).toHaveLength(0);
        expect(wrapper.find(InputFieldWrapper).prop('children')).toEqual('1/1/1970');
    });

    it('should render an error', () => {
        wrapper.setProps({ validationError: 'validation error', submitted: true });
        expect(wrapper.find('.error')).toHaveLength(1);
    });

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(DatePicker).prop('onChange')(testDate);
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, testDate);
        expect(wrapper.find(InputFieldWrapper).prop('touched')).toEqual(true);
    });

    it('should set min and max date', () => {
        wrapper.setProps({ minDate: testMinDate, maxDate: testMaxDate });
        expect(wrapper.find(DatePicker).prop('minDate')).toBe(testMinDate);
        expect(wrapper.find(DatePicker).prop('maxDate')).toBe(testMaxDate);
    });
});
