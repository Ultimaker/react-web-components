// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DateField, { DateFieldProps } from '../date_field';
import InputFieldWrapper from '../input_field_wrapper';
import DatePicker from '../../date_picker';

describe('The date field component', () => {
    let props: DateFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: '2018-12-31',
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            placeholder: 'placeholder text',
        };
        wrapper = shallow(<DateField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a date picker', () => {
        expect(wrapper.find(DatePicker).props()).toEqual({
            error: undefined,
            format: 'DD-MM-YYYY',
            id: 'testInputField',
            onChangeHandler: wrapper.instance()._onChange,
            placeholder: 'placeholder text',
            value: '2018-12-31',
        });
    });

    it('should render an empty date', () => {
        wrapper.setProps({ value: null });
        expect(wrapper.find(DatePicker).prop('value')).toBeNull();
    });

    it('should render a static date', () => {
        wrapper.setProps({ staticField: true });
        expect(wrapper.find(DatePicker)).toHaveLength(0);
        expect(wrapper.find(InputFieldWrapper).prop('children')).toEqual('31-12-2018');
    });

    it('should render an error', () => {
        wrapper.setProps({ validationError: 'validation error', submitted: true });
        expect(wrapper.find(DatePicker).prop('error')).toEqual(true);
    });

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(DatePicker).prop('onChangeHandler')('2016-02-29');
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, '2016-02-29');
        expect(wrapper.find(InputFieldWrapper).prop('touched')).toEqual(true);
    });
});
