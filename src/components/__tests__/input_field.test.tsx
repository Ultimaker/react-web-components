// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputField from '../input_field';
import InputFieldLabel from '../input_field_label';
import InputFieldValidation from '../input_field_validation';

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

    it('should render a label', () => {
        wrapper.setProps({ label: 'Test label' });
        expect(wrapper.find(InputFieldLabel)).toHaveLength(1);
    });

    it('should render a validation error', () => {
        wrapper.setProps({ validationError: 'Test validation error' });
        expect(wrapper.find(InputFieldValidation).exists()).toEqual(false);
        wrapper.setState({ touched: true }); // only show validation message if the field has been edited ('touched')
        expect(wrapper.find(InputFieldValidation)).toHaveLength(1);
        wrapper.setState({ touched: false });
        expect(wrapper.find(InputFieldValidation).exists()).toEqual(false);
        wrapper.setProps({ submitted: true }); // or if the form has been submitted
        expect(wrapper.find(InputFieldValidation)).toHaveLength(1);
    });

    it('should handle the user input', () => {
        expect(wrapper.state('touched')).toEqual(false);
        wrapper.instance()._onChangeHandler('Test input');
        expect(wrapper.state('touched')).toEqual(true);
        expect(props.onChangeHandler).toHaveBeenCalledWith('testInputField', 'Test input');
    });

    it('should handle the user clearing the input', () => {
        wrapper.instance()._onChangeHandler('');
        expect(props.onChangeHandler).toHaveBeenCalledWith('testInputField', null);
    });

    it('should handle a number input', () => {
        wrapper.setProps({ type: 'number' });
        wrapper.instance()._onChangeHandler('1');
        expect(props.onChangeHandler).toHaveBeenCalledWith('testInputField', 1);
    });

    it('should only call onChangeHandler if passed', () => {
        wrapper.setProps({ onChangeHandler: null });
        wrapper.instance()._onChangeHandler('Test input');
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });
});
