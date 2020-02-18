// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { mount, shallow } from 'enzyme';

// components
import CodeField, { CodeFieldProps } from '../code_field';
import InputFieldWrapper from '../input_field_wrapper';

describe('The code input field component', () => {
    let props: CodeFieldProps;
    let wrapper;
    const preventDefault = jest.fn();

    const oldEventListeners = [document.addEventListener, document.removeEventListener];

    beforeEach(() => {
        props = {
            id: 'testInputField',
            type: 'text',
            value: '2018',
            onChangeHandler: jest.fn().mockImplementation((id, value) => (
                props.id === id && wrapper.setProps({ value })
            )),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            focusOnLoad: false,
            placeholder: 'placeholder',
            maxLength: 6,
        };
        document.activeElement.id = '';
        preventDefault.mockReset();
        [document.addEventListener, document.removeEventListener] = oldEventListeners;
    });

    it('should render a wrapper', () => {
        wrapper = shallow(<CodeField {...props} />);
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a null', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({ value: null });
        expect(wrapper.find(InputFieldWrapper).prop('value')).toBeUndefined();
    });

    it('should render a wrapped field', () => {
        wrapper = shallow(<CodeField {...props} />);
        expect(wrapper.find(InputFieldWrapper).props()).toEqual({
            id: 'testInputField',
            children: expect.any(Object),
            focusOnLoad: false,
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            onChangeHandler: props.onChangeHandler,
            showValidationError: true,
            inputChildren: props.children,
            staticField: false,
            touched: false,
        });
        expect(wrapper.find(InputFieldWrapper).children()).toHaveLength(2 * props.maxLength - 1);
        expect(wrapper.find(InputFieldWrapper).find('input')).toHaveLength(props.maxLength);

        const commonProps = {
            onKeyDown: expect.any(Function),
            onChange: expect.any(Function),
            onPaste: expect.any(Function),
            name: 'testInputField',
            maxLength: 1,
            className: 'input',
            type: 'text',
            placeholder: null,
        };
        expect(wrapper.find(InputFieldWrapper).find('input').map((i) => i.props())).toEqual([
            { id: 'testInputField__0', value: '2', ...commonProps },
            { id: 'testInputField__1', value: '0', ...commonProps },
            { id: 'testInputField__2', value: '1', ...commonProps },
            { id: 'testInputField__3', value: '8', ...commonProps },
            { id: 'testInputField__4', value: '', ...commonProps },
            { id: 'testInputField__5', value: '', ...commonProps },
        ]);
    });

    it('should render a static field', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({ staticField: true });
        expect(wrapper.find(InputFieldWrapper).prop('children')).toEqual([false, props.value, false]);
    });

    it('should render a static password', () => {
        props.staticField = true;
        props.type = 'password';
        props.maxLength = 10;
        props.value = 'Password';
        wrapper = shallow(<CodeField {...props} />);
        expect(wrapper.find(InputFieldWrapper).prop('children')).toEqual(['**********', false, false]);
    });

    it('should set the maximum input field length', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({ maxLength: 10 });
        expect(wrapper.find('input')).toHaveLength(10);
        wrapper.find('input').map((i) => expect(i.prop('maxLength')).toEqual(1));
    });

    it('should allow an empty placeholder', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({ placeholder: null });
    });

    it('should show a validation error', () => {
        wrapper = shallow(<CodeField {...props} />);
        expect(wrapper.find(InputFieldWrapper).prop('validationError')).toBeFalsy();
        wrapper.setProps({ validationError: 'An error', submitted: true });
        expect(wrapper.find(InputFieldWrapper).prop('validationError')).toEqual('An error');
        expect(wrapper.find('input').map((i) => i.prop('className'))).toEqual([
            'input error', 'input error', 'input error', 'input error', 'input error', 'input error',
        ]);
    });

    it('should only call the callback with numbers', () => {
        props.type = 'number';
        wrapper = mount(<CodeField {...props} />);

        expect(document.activeElement.id).toEqual('');
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        wrapper.find('input').at(4).prop('onKeyDown')({ key: 'a', preventDefault });
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(document.activeElement.id).toEqual('');

        wrapper.find('input').at(4).prop('onKeyDown')({ key: '1', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, `${props.value}1`);
        expect(document.activeElement.id).toEqual('testInputField__5');

        expect(preventDefault).toHaveBeenCalledTimes(2);
    });

    it('should add a character', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(4).prop('onChange')({ target: { value: '1' }, preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '20181');
        expect(wrapper.state('touched')).toEqual(true);
        expect(document.activeElement.id).toEqual('testInputField__5');
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should ignore bad keys', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onKeyDown')({ key: ' ', preventDefault });
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(document.activeElement.id).toEqual('');
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should not prevent default when ctrl is pressed', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(4).prop('onKeyDown')({ key: '1', ctrlKey: true, preventDefault });
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(document.activeElement.id).toEqual('');
        expect(preventDefault).toHaveBeenCalledTimes(0);
    });

    it('should replace a character', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onPaste')({ clipboardData: { getData: () => '7' }, preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__4');
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2017');
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should ignore an empty clipboard', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onPaste')({ clipboardData: { getData: () => null }, preventDefault });
        expect(document.activeElement.id).toEqual('');
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should ignore the same character', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onKeyDown')({ key: '8', preventDefault });
        expect(document.activeElement.id).toEqual('');
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should finish the input', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(4).prop('onKeyDown')({ key: '1', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__5');
        wrapper.find('input').at(5).prop('onKeyDown')({ key: '7', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '201817');
        expect(preventDefault).toHaveBeenCalledTimes(2);
    });

    it('should set focus on load', () => {
        props.focusOnLoad = true;
        wrapper = mount(<CodeField {...props} />);
        expect(document.activeElement.id).toEqual('testInputField__4');
    });

    it('should handle arrow left key', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onKeyDown')({ key: 'ArrowLeft', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__2');
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should handle arrow right key', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(2).prop('onKeyDown')({ key: 'ArrowRight', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__3');
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should handle arrow up key for numbers', () => {
        props.type = 'number';
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onKeyDown')({ key: 'ArrowUp', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2019');
        wrapper.find('input').at(3).prop('onKeyDown')({ key: 'ArrowUp', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2010');
        expect(preventDefault).toHaveBeenCalledTimes(2);
    });

    it('should handle arrow down key for numbers', () => {
        props.type = 'number';
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(2).prop('onKeyDown')({ key: 'ArrowDown', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2008');
        wrapper.find('input').at(2).prop('onKeyDown')({ key: 'ArrowDown', preventDefault });
        expect(preventDefault).toHaveBeenCalledTimes(2);
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2098');
    });

    it('should handle arrow up key for text', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onKeyDown')({ key: 'ArrowUp', preventDefault });
        expect(preventDefault).toHaveBeenCalledTimes(0);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(0);
    });

    it('should handle arrow down key for text', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(2).prop('onKeyDown')({ key: 'ArrowDown', preventDefault });
        expect(preventDefault).toHaveBeenCalledTimes(0);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(0);
    });

    it('should handle home key', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(2).prop('onKeyDown')({ key: 'Home', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__0');
        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should handle end key', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(0).prop('onKeyDown')({ key: 'End', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__5');
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(0);
    });

    it('should handle backspace on a field with value', () => {
        props.value = '2018\t0';
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(5).prop('onKeyDown')({ key: 'Backspace', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2018');
        expect(document.activeElement.id).toEqual('testInputField__5');
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
    });

    it('should handle backspace on empty field', () => {
        props.value = '2018\t0';
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(4).prop('onKeyDown')({ key: 'Backspace', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__3');
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '201\t\t0');
    });

    it('should handle delete on empty input', () => {
        props.value = '2018\t0';
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(4).prop('onKeyDown')({ key: 'Delete', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__4');
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '20180');
    });

    it('should handle delete on last input', () => {
        props.value = '201811';
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(5).prop('onKeyDown')({ key: 'Delete', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__5');
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '20181');
    });

    it('should handle delete on input with a value', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(0).prop('onKeyDown')({ key: 'Delete', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__0');
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '018');
    });

    it('should handle a number', () => {
        wrapper = mount(<CodeField {...props} />);
        wrapper.find('input').at(3).prop('onKeyDown')({ key: '9', preventDefault });
        expect(document.activeElement.id).toEqual('testInputField__4');
        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2019');
    });

    it('should select the current field if unselected', async () => {
        const [addEventListener, removeEventListener] = [jest.fn(), jest.fn()];
        document.addEventListener = addEventListener;
        document.removeEventListener = removeEventListener;

        wrapper = mount(<CodeField {...props} />);
        expect(addEventListener).toHaveBeenCalledWith('selectionchange', expect.any(Function));
        const onSelection = addEventListener.mock.calls[0][1];

        const ref = wrapper.instance()._inputRefs[0];
        ref.select = jest.fn();

        // backspace should delete the current content, but then the select cannot be called again
        wrapper.find('input').at(0).prop('onKeyDown')({ key: 'Backspace', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '\t018');
        ref.value = '';
        expect(document.activeElement).toEqual(ref);
        expect(ref.select).toHaveBeenCalledTimes(1);
        onSelection();
        expect(ref.select).toHaveBeenCalledTimes(1);

        // backspace should set the current content to another, ref.select() should be called again
        wrapper.find('input').at(0).prop('onKeyDown')({ key: 'Delete', preventDefault });
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '018');
        ref.value = '0';
        expect(document.activeElement).toEqual(ref);
        expect(ref.select).toHaveBeenCalledTimes(2);
        onSelection();
        expect(ref.select).toHaveBeenCalledTimes(3);

        expect(removeEventListener).not.toHaveBeenCalled();
        wrapper.unmount();
        expect(removeEventListener).toHaveBeenCalledWith('selectionchange', onSelection);
    });
});
