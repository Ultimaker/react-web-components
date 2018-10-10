// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import TextareaField, {TextareaFieldProps} from '../textarea_field';
import Textarea from '../../textarea';
import InputFieldWrapper from '../input_field_wrapper';

describe('The textarea field component', () => {
    let props: TextareaFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: "2018",
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            placeholder: "placeholder textarea",
        };
        wrapper = shallow(<TextareaField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a null', () => {
        wrapper.setProps({value: null})
        expect(wrapper.find(Textarea).prop("value")).toBeNull()
    })

    it('should render a wrapped textarea', () => {
        expect(wrapper.find(Textarea).props()).toEqual({
            id: props.id,
            onChangeHandler: wrapper.instance()._onChange,
            placeholder: props.placeholder,
            value: props.value,
            autofocus: props.focusOnLoad,
            autoGrow: props.textareaAutoGrow,
        });
    })

    it('should render a static textarea', () => {
        wrapper.setProps({staticField: true})
        expect(wrapper.find(InputFieldWrapper).prop("children").map(c => c.props.children)).toEqual([props.value]);
    })

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(Textarea).prop("onChangeHandler")("some text")
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, "some text");
        wrapper.find(Textarea).prop("onChangeHandler")("")
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, "");
    });
});
