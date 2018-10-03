// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import WrappedInputField, {WrappedInputFieldProps} from '../wrapped_input_field';
import InputFieldWrapper from '../input_field_wrapper';

describe('The wrapped input field component', () => {
    let props: WrappedInputFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            type: 'text',
            value: '2018',
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            focusOnLoad: true,
            placeholder: 'placeholder text',
            min: 1,
            max: 1000,
        };
        wrapper = shallow(<WrappedInputField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a null', () => {
        wrapper.setProps({value: null});
        expect(wrapper.find(InputFieldWrapper).prop("value")).toBeUndefined();
    })

    it('should render a wrapped field', () => {
        expect(wrapper.find(InputFieldWrapper).props()).toEqual({
            id: "testInputField",
            children: expect.any(Object),
            focusOnLoad: true,
            labelLayoutWidth: "1/1",
            labelWidthBreakpoint: "sm",
            onChangeHandler: props.onChangeHandler,
            staticField: false,
            touched: false,
        });
        expect(wrapper.find(InputFieldWrapper).children().type()).toEqual("input")
        expect(wrapper.find(InputFieldWrapper).children().props()).toEqual({
            className: "input",
            id: "testInputField",
            max: 1000,
            min: 1,
            name: "testInputField",
            onChange: wrapper.instance()._onChange,
            placeholder: "placeholder text",
            type: "text",
            value: "2018",
        });
    })

    it('should render a static field', () => {
        wrapper.setProps({staticField: true, children: props.value})
        expect(wrapper.find(InputFieldWrapper).prop("children")).toEqual([false, props.value]);
    })

    it('should render a custom static field', () => {
        wrapper.setProps({staticField: true, children: <div>static text</div>})
        expect(wrapper.find(InputFieldWrapper).prop("children")).toEqual([false, <div>static text</div>]);
    })

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find("input").prop("onChange")({target: {value: "some text"}})
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, "some text");
        expect(wrapper.state("touched")).toEqual(true);
        wrapper.find("input").prop("onChange")({target: {value: ""}})
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, null);
    });
});
