// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import InputFieldInput from '../input_field_input';
import SelectList from '../select_list';
import Checkbox from '../checkbox';
import ImageUpload from '../image_upload';
import DatePicker from '../date_picker';
import FileUpload from '../file_upload';
import TagsSelector from '../tags_selector';
import RequiredIcon from '../icons/required_icon';
import Image from '../image';

describe('The InputFieldInput component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: 'Test input',
            onChangeHandler: jest.fn(),
            type: 'text',
            showValidationError: false,
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm'
        };
        wrapper = shallow(<InputFieldInput {...props} />);
    });

    it('should render a text input', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a number input', () => {
        wrapper.setProps({ type: 'number' });
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('input').prop('type')).toBe('number');
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a textarea', () => {
        wrapper.setProps({ type: 'textarea' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find('textarea')).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a password input', () => {
        wrapper.setProps({ type: 'password' });
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('input').prop('type')).toBe('password');
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render an email input', () => {
        wrapper.setProps({ type: 'email' });
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('input').prop('type')).toBe('email');
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a url input', () => {
        wrapper.setProps({ type: 'url' });
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('input').prop('type')).toBe('url');
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a select input', () => {
        wrapper.setProps({ type: 'select' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find(SelectList)).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a checkbox input', () => {
        wrapper.setProps({ type: 'checkbox' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find(Checkbox)).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render an image upload input', () => {
        wrapper.setProps({ type: 'image' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find(ImageUpload)).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render an date picker input', () => {
        wrapper.setProps({ type: 'date' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find(DatePicker)).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a file upload input', () => {
        wrapper.setProps({ type: 'file' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find(FileUpload)).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a tag selector input', () => {
        wrapper.setProps({ type: 'tags' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find(TagsSelector)).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a custom input', () => {
        wrapper.setProps({ type: 'children', children: <div className="custom-input"></div> });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find('.custom-input')).toHaveLength(1);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a required icon', () => {
        wrapper.setProps({ required: 'true' });
        expect(wrapper.find(RequiredIcon)).toHaveLength(1);
    });

    it('should focus on the input on load', () => {
        mount(<InputFieldInput {...props} focusOnLoad="true" />);
        const focusedElement = document.activeElement;
        expect(focusedElement.id).toBe('testInputField');
    });

    it('should render a static text field', () => {
        wrapper.setProps({ staticField: 'true' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a static url link', () => {
        wrapper.setProps({ staticField: 'true', type: 'url', value: 'https://ultimaker.com/' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find('a')).toHaveLength(1);
        expect(wrapper.find('a').prop('href')).toBe('https://ultimaker.com/');
    });

    it('should render a static email link', () => {
        wrapper.setProps({ staticField: 'true', type: 'email', value: 'test@ultimaker.com' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find('a')).toHaveLength(1);
        expect(wrapper.find('a').prop('href')).toBe('mailto:test@ultimaker.com');
    });

    it('should render a static date', () => {
        wrapper.setProps({ staticField: 'true', type: 'date', value: '2018-09-03T10:06:48' });
        expect(wrapper.find('input').exists()).toBe(false);
        expect(wrapper.find('div').text()).toBe('03-09-2018');
    });

    it('should render a static select value', () => {
        wrapper.setProps({
            staticField: 'true',
            type: 'select', value: 3,
            selectOptions: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2, disabled: true },
                { label: 'Option 3', value: 3 }
            ]
        });
        expect(wrapper.find(SelectList).exists()).toBe(false);
        expect(wrapper.find('div').text()).toBe('Option 3');
    });

    it('should render a static image', () => {
        wrapper.setProps({ staticField: 'true', type: 'image' });
        expect(wrapper.find(ImageUpload).exists()).toBe(false);
        expect(wrapper.find(Image)).toHaveLength(1);
    });

    it('should render a static checkbox', () => {
        wrapper.setProps({ staticField: 'true', type: 'checkbox' });
        expect(wrapper.find(Checkbox)).toHaveLength(1);
        expect(wrapper.find(Checkbox).prop('disabled')).toBe('true');
    });

    it('should render children after the input', () => {
        wrapper.setProps({ children: <div className="child"></div> });
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle an input change', () => {
        wrapper.find('input').simulate('change', { target: { value: 'update' } });
        expect(props.onChangeHandler).toHaveBeenCalledWith('update');
    });

    it('should handle an textarea input change', () => {
        wrapper.setProps({ type: 'textarea' });
        wrapper.find('textarea').simulate('change', { target: { value: 'update' } });
        expect(props.onChangeHandler).toHaveBeenCalledWith('update');
    });

});
