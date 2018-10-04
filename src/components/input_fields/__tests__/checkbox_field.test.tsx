// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import CheckboxField, {CheckboxFieldProps} from '../checkbox_field';
import Checkbox from '../../checkbox';
import InputFieldWrapper from '../input_field_wrapper';

describe('The checkbox field component', () => {
    let props: CheckboxFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: true,
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
        };
        wrapper = shallow(<CheckboxField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a checkbox input', () => {
        expect(wrapper.find(Checkbox).props()).toEqual({
            disabled: false,
            id: "testInputField",
            onChangeHandler: wrapper.instance()._onChange,
            value: true,
        });
    })

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(Checkbox).prop("onChangeHandler")(false)
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, false);
        expect(wrapper.find(InputFieldWrapper).prop("touched")).toEqual(true);
    });
});
