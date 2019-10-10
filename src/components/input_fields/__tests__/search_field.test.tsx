// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { mount, shallow } from 'enzyme';

// component
import SearchField, { SearchFieldProps } from '../search_field';
import DefaultInputField from '../default_input_field';
import RejectedIcon from '../../icons/rejected_icon';
import PendingIcon from '../../icons/pending_icon';
import Button from '../../button';

describe('The search field component', () => {
    let props: SearchFieldProps;
    let wrapper;
    let inputRef;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: '2018',
            onChangeHandler: jest.fn().mockImplementation((id, value) => props.id === id && wrapper.setProps({ value })),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            placeholder: 'placeholder text',
        };
        inputRef = { focus: jest.fn() };

        wrapper = shallow(<SearchField {...props} />);
        expect(wrapper.find(DefaultInputField).prop('inputRef')).toEqual(wrapper.instance()._inputRef);
        wrapper.instance()._inputRef.current = inputRef;
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(inputRef.focus).not.toHaveBeenCalled();
    });

    it('should render a null', () => {
        wrapper.setProps({ value: null });
        expect(wrapper.find(DefaultInputField).prop('value')).toBeNull();
        expect(wrapper.find(PendingIcon)).toHaveLength(1);
        wrapper.find(Button).prop('onClickHandler')();
        expect(inputRef.focus).toHaveBeenCalled();
        expect(wrapper.find(PendingIcon)).toHaveLength(1);
    });

    it('should render a wrapped input', () => {
        props.staticField = true;
        props.children = 'a child';
        wrapper.setProps(props);
        props.inputChildren = props.children;
        props.inputRef = expect.anything();
        props.type = 'text';
        props.children = props.value;
        expect(wrapper.find(DefaultInputField).props()).toEqual(props);
    });

    it('should reset the value of the field', () => {
        expect(wrapper.find(RejectedIcon)).toHaveLength(1);
        wrapper.find(Button).prop('onClickHandler')();
        expect(inputRef.focus).toHaveBeenCalled();
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, null);
        expect(wrapper.find(PendingIcon)).toHaveLength(1);
    });

    it('should render a static text', () => {
        wrapper.setProps({ staticField: true, children: 'a child' });
        expect(wrapper.find(DefaultInputField).prop('children')).toEqual(props.value);
        expect(wrapper.find(DefaultInputField).prop('inputChildren')).toEqual('a child');
    });

    it('should set the field maximum length', () => {
        wrapper.setProps({ maxLength: 100 });
        expect(wrapper.find(DefaultInputField).prop('maxLength')).toEqual(100);
    });

    it('should focus on mount', () => {
        props.focusOnLoad = true;
        wrapper = mount(<SearchField {...props} />);
        expect(document.activeElement.id).toEqual(props.id);
    });

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(DefaultInputField).prop('onChangeHandler')(props.id, '2016');
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2016');
        wrapper.find(DefaultInputField).prop('onChangeHandler')(props.id, '');
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '');
    });
});
