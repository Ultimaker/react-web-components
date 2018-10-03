// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import TextField, {TextFieldProps} from '../text_field';
import WrappedInputField from '../wrapped_input_field';

describe('The text field component', () => {
    let props: TextFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            type: 'text',
            value: "2018",
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            placeholder: "placeholder text",
        };
        wrapper = shallow(<TextField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a null', () => {
        wrapper.setProps({value: null})
        expect(wrapper.find(WrappedInputField).prop("value")).toBeNull()
    })

    it('should render a wrapped input', () => {
        props.staticField = true
        props.children = 'a child'
        wrapper.setProps(props)
        props['inputChildren'] = props['children']
        props.children = props.value
        expect(wrapper.find(WrappedInputField).props()).toEqual(props);
    })

    it('should render a static text', () => {
        wrapper.setProps({staticField: true, children: "a child"})
        expect(wrapper.find(WrappedInputField).prop("children")).toEqual(props.value);
        expect(wrapper.find(WrappedInputField).prop("inputChildren")).toEqual("a child");
    })

    it('should render a static e-mail', () => {
        wrapper.setProps({staticField: true, type: "email"})
        expect(wrapper.find(WrappedInputField).prop("children")).toEqual(
            <a href={"mailto:" + props.value} target="_top">{props.value}</a>
        );
        expect(wrapper.find(WrappedInputField).prop("inputChildren")).toBeUndefined();
    })

    it('should render a static URL', () => {
        wrapper.setProps({staticField: true, type: "url", children: <div>child</div>})
        expect(wrapper.find(WrappedInputField).prop("inputChildren")).toEqual(<div>child</div>)
        expect(wrapper.find(WrappedInputField).prop("children")).toEqual(
            <a href={props.value} target="_blank">{props.value}</a>
        );
    })

    it('should render a static password', () => {
        wrapper.setProps({staticField: true, type: "password"})
        expect(wrapper.find(WrappedInputField).prop("children")).toEqual("****");
        expect(wrapper.find(WrappedInputField).prop("inputChildren")).toBeUndefined();
    })

    it('should render an empty password', () => {
        wrapper.setProps({staticField: true, type: "password", value: null})
        expect(wrapper.find(WrappedInputField).prop("children")).toEqual(null);
        expect(wrapper.find(WrappedInputField).prop("inputChildren")).toBeUndefined();
    })

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(WrappedInputField).prop("onChangeHandler")(props.id, "2016")
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, "2016");
        wrapper.find(WrappedInputField).prop("onChangeHandler")(props.id, "")
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, "");
    });
});
