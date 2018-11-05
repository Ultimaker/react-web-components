// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import CodeField, {CodeFieldProps} from '../code_field';
import InputFieldWrapper from '../input_field_wrapper';

describe('The code input field component', () => {
    let props: CodeFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            type: 'text',
            value: '2018',
            onChangeHandler: jest.fn().mockImplementation((id, value) => props.id === id && wrapper.setProps({value})),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            focusOnLoad: true,
            placeholder: 'placeholder',
            maxLength: 6,
        };
        wrapper = shallow(<CodeField {...props} />);
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
            inputChildren: props.children,
            staticField: false,
            touched: false,
        });
        expect(wrapper.find(InputFieldWrapper).children()).toHaveLength(props.maxLength)

        const commonProps = {
            onChange: expect.any(Function), onKeyDown: expect.any(Function),
            name: "testInputField", maxLength: 1, className: "input", type: "text",
        }
        expect(wrapper.find(InputFieldWrapper).children().map(i => i.props())).toEqual([
            {id: "testInputField__0", placeholder: "p", value: "2", ...commonProps},
            {id: "testInputField__1", placeholder: "l", value: "0", ...commonProps},
            {id: "testInputField__2", placeholder: "a", value: "1", ...commonProps},
            {id: "testInputField__3", placeholder: "c", value: "8", ...commonProps},
            {id: "testInputField__4", placeholder: "e", value: "", ...commonProps},
            {id: "testInputField__5", placeholder: "h", value: "", ...commonProps},
        ]);
    })

    it('should render a static field', () => {
        wrapper.setProps({staticField: true})
        expect(wrapper.find(InputFieldWrapper).prop("children")).toEqual(props.value);
    })

    it('should render a static password', () => {
        wrapper.setProps({staticField: true, type: "password"})
        expect(wrapper.find(InputFieldWrapper).prop("children")).toEqual("****");
    })

    it('should set the maximum input field length', () => {
        wrapper.setProps({maxLength: 10})
        expect(wrapper.find("input")).toHaveLength(10);
        wrapper.find("input").map(i => expect(i.prop('maxLength')).toEqual(1));
    })

    it('should allow an empty placeholder', () => {
        wrapper.setProps({placeholder: null})
    })

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find("input").at(4).prop("onChange")({target: {value: "1"}})
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, "20181");
        expect(wrapper.state("touched")).toEqual(true);
        wrapper.find("input").at(3).prop("onChange")({target: {value: "2"}})
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, "20121");
    });
});
