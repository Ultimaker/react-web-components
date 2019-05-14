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
    const testDate = '2019-01-01T00:00:00.000Z';
    const testMinDate = '2018-01-01T00:00:00.000Z';
    const testMaxDate = '2019-01-01T00:00:00.000Z';

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: testDate,
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            locale: 'en-US',
        };
        wrapper = shallow(<DateField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render an empty date', () => {
        wrapper.setProps({ value: null });
        expect(wrapper.find(DatePicker).prop('value')).toBeNull();
    });

    it('should render a static date', () => {
        wrapper.setProps({ staticField: true });
        expect(wrapper.find(DatePicker)).toHaveLength(0);
        expect(wrapper.find(InputFieldWrapper).prop('children')).toEqual('1/1/2019');
    });

    it('should render an error', () => {
        wrapper.setProps({ validationError: 'validation error', submitted: true });
        expect(wrapper.find('.error')).toHaveLength(1);
    });

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(DatePicker).prop('onChange')(new Date(testDate));
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, testDate);
        expect(wrapper.find(InputFieldWrapper).prop('touched')).toEqual(true);
    });

    it('should set min and max date', () => {
        wrapper.setProps({ minDate: testMinDate, maxDate: testMaxDate });
        expect(wrapper.find(DatePicker).prop('minDate')).toEqual(new Date(testMinDate));
        expect(wrapper.find(DatePicker).prop('maxDate')).toEqual(new Date(testMaxDate));
    });
});
