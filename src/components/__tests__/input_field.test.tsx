// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputField from '../input_field';
import NumberField from '../input_fields/number_field';
import TextField from '../input_fields/text_field';

describe('The InputField component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: 'Test input',
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<InputField {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should handle an e-mail input', () => {
        wrapper.setProps({ type: 'email', staticField: true });
        expect(wrapper.find(TextField).props()).toEqual({
            children: undefined,
            id: 'testInputField',
            type: 'email',
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            onChangeHandler: props.onChangeHandler,
            showValidationError: true,
            staticField: true,
            value: 'Test input',
        });
    });
    it('should handle a number input', () => {
        wrapper.setProps({ type: 'number', min: 1 });
        expect(wrapper.find(NumberField).props()).toEqual({
            children: undefined,
            id: 'testInputField',
            min: 1,
            type: 'number',
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            onChangeHandler: props.onChangeHandler,
            showValidationError: true,
            staticField: false,
            value: 'Test input',
        });
    });
});
