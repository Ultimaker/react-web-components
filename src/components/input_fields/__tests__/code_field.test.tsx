// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import {mount, shallow} from 'enzyme'
import _ = require('lodash');

// components
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
            focusOnLoad: false,
            placeholder: 'placeholder',
            maxLength: 6,
        };
    });

    it('should render a wrapper', () => {
        wrapper = shallow(<CodeField {...props} />);
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a null', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({value: null});
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
            inputChildren: props.children,
            staticField: false,
            touched: false,
        });
        expect(wrapper.find(InputFieldWrapper).children()).toHaveLength(2 * props.maxLength - 1)
        expect(wrapper.find(InputFieldWrapper).find("input")).toHaveLength(props.maxLength)

        const commonProps = {
            onChange: expect.any(Function), onKeyDown: expect.any(Function),
            name: 'testInputField', maxLength: 1, className: 'input', type: 'text', placeholder: null,
        }
        expect(wrapper.find(InputFieldWrapper).find("input").map(i => i.props())).toEqual([
            {id: 'testInputField__0', value: '2', ...commonProps},
            {id: 'testInputField__1', value: '0', ...commonProps},
            {id: 'testInputField__2', value: '1', ...commonProps},
            {id: 'testInputField__3', value: '8', ...commonProps},
            {id: 'testInputField__4', value: '', ...commonProps},
            {id: 'testInputField__5', value: '', ...commonProps},
        ]);
    });

    it('should render a static field', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({staticField: true})
        expect(wrapper.find(InputFieldWrapper).prop('children')).toEqual(props.value);
    });

    it('should render a static password', () => {
        props.staticField = true;
        props.type = 'password';
        props.maxLength = 10;
        props.value = 'Password';
        wrapper = shallow(<CodeField {...props} />);
        expect(wrapper.find(InputFieldWrapper).prop('children')).toEqual('**********');
    });

    it('should set the maximum input field length', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({maxLength: 10})
        expect(wrapper.find('input')).toHaveLength(10);
        wrapper.find('input').map(i => expect(i.prop('maxLength')).toEqual(1));
    });

    it('should allow an empty placeholder', () => {
        wrapper = shallow(<CodeField {...props} />);
        wrapper.setProps({placeholder: null})
    });

    it('should show a validation error', () => {
        wrapper = shallow(<CodeField {...props} />);
        expect(wrapper.find(InputFieldWrapper).prop('validationError')).toBeFalsy();
        wrapper.setProps({validationError: 'An error', submitted: true});
        expect(wrapper.find(InputFieldWrapper).prop('validationError')).toEqual('An error');
        expect(wrapper.find('input').map(i => i.prop('className'))).toEqual(_.times(6, () => 'input error'));
    });

    it('should call the callback', () => {
        wrapper = mount(<CodeField {...props} />);

        expect(document.activeElement.id).toEqual('');
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        wrapper.find('input').at(4).prop('onChange')({target: {value: '1'}});
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '20181');
        expect(wrapper.state('touched')).toEqual(true);
        expect(document.activeElement.id).toEqual('testInputField__5');

        wrapper.find('input').at(3).prop('onChange')({target: {value: ''}});
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '201\t1');
        expect(document.activeElement.id).toEqual('testInputField__5');

        wrapper.find('input').at(3).prop('onChange')({target: {value: '7'}});
        expect(document.activeElement.id).toEqual('testInputField__4');
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '20171');

        wrapper.find('input').at(5).prop('onChange')({target: {value: '7'}});
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '201717');
    });

    it('should handle key down', () => {
        props.focusOnLoad = true;
        wrapper = mount(<CodeField {...props} />);
        expect(document.activeElement.id).toEqual('testInputField__4');
        const preventDefault = jest.fn();

         // arrow left
        wrapper.find('input').at(3).prop('onKeyDown')({key: 'ArrowLeft', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__2');
        expect(preventDefault).toHaveBeenCalledTimes(1);

        // arrow right
        wrapper.find('input').at(2).prop('onKeyDown')({key: 'ArrowRight', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__3');
        expect(preventDefault).toHaveBeenCalledTimes(2);

        // home
        wrapper.find('input').at(2).prop('onKeyDown')({key: 'Home', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__0');
        expect(preventDefault).toHaveBeenCalledTimes(3);

        // end
        wrapper.find('input').at(0).prop('onKeyDown')({key: 'End', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__5');
        expect(preventDefault).toHaveBeenCalledTimes(4);
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        wrapper.setProps({value: '2018\t0'});

        // Backspace
        wrapper.find('input').at(4).prop('onKeyDown')({key: 'Backspace', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__3');
        expect(preventDefault).toHaveBeenCalledTimes(4);
        wrapper.setProps({value: '2018\t0'});

        // Delete on empty input
        wrapper.find('input').at(4).prop('onKeyDown')({key: 'Delete', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__3');
        expect(preventDefault).toHaveBeenCalledTimes(5);
        expect(props.onChangeHandler).toHaveBeenLastCalledWith(props.id, '2018');

        // Delete on last empty input
        wrapper.find('input').at(5).prop('onKeyDown')({key: 'Delete', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__3');
        expect(preventDefault).toHaveBeenCalledTimes(5);

        // Delete on input with value
        wrapper.find('input').at(0).prop('onKeyDown')({key: 'Delete', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__3');
        expect(preventDefault).toHaveBeenCalledTimes(5);

        // same value again
        wrapper.find('input').at(0).prop('onKeyDown')({key: '2', preventDefault});
        expect(document.activeElement.id).toEqual('testInputField__1');

        expect(props.onChangeHandler).toHaveBeenCalledTimes(1);
    });
});
