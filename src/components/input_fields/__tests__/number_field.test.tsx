// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import NumberField, {NumberFieldProps} from '../number_field';
import WrappedInputField from '../wrapped_input_field';

describe('The number field component', () => {
    let props: NumberFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: 2018,
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            placeholder: "placeholder text",
            min: 2000,
            max: 2100,
        };
        wrapper = shallow(<NumberField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a zero', () => {
        wrapper.setProps({value: 0})
        expect(wrapper.find(WrappedInputField).prop("value")).toEqual("0")
    })

    it('should render a null', () => {
        wrapper.setProps({value: null})
        expect(wrapper.find(WrappedInputField).prop("value")).toBeNull()
    })

    it('should render a wrapped input', () => {
        expect(wrapper.find(WrappedInputField).props()).toEqual({
            id: "testInputField",
            labelLayoutWidth: props.labelLayoutWidth,
            labelWidthBreakpoint: props.labelWidthBreakpoint,
            staticField: props.staticField,
            min: props.min,
            max: props.max,
            onChangeHandler: expect.any(Function),
            type: "number",
            value: "2018",
            children: [false, undefined],
        });
    })

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(WrappedInputField).prop("onChangeHandler")(props.id, "2016")
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, 2016);
        wrapper.find(WrappedInputField).prop("onChangeHandler")(props.id, "")
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, null);
    });
});
