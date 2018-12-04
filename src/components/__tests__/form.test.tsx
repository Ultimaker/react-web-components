// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import { Form } from '../form';
import { InputField } from '../input_field';
import { Button } from '../button';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';

describe('The Form component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            onSubmitHandler: jest.fn(),
            primaryBtnText: 'primaryBtnText',
        };
        wrapper = shallow(<Form {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onSubmitHandler).not.toHaveBeenCalled();
    });

    it('should call onSubmitHandler when form is submitted', () => {
        wrapper.simulate('submit', mockClickEvent);
        expect(props.onSubmitHandler).toHaveBeenCalled();
        expect(wrapper.state('submitted')).toBe(true);
        expect(mockClickEvent.preventDefault).toBeCalled();
    });

    it('should render a secondary button', () => {
        wrapper.setProps({
            secondaryBtnText: 'secondaryBtnText',
            secondaryBtnHandler: jest.fn(),
            secondaryBtnStyle: 'secondary',
        });
        expect(props.onSubmitHandler).not.toHaveBeenCalled();
        expect(wrapper.find(Button)).toHaveLength(2);
    });

    it('should render a secondary button link', () => {
        wrapper.setProps({
            secondaryBtnText: 'secondaryBtnText',
            secondaryBtnLink: 'https://ultimaker.com/',
            secondaryBtnStyle: 'secondary',
        });
        expect(wrapper.find(Button).at(1).prop('type')).toBe('link');
    });

    it('should render with a form item', () => {
        const mountedWrapper = mount(
          <Form {...props}>
            <InputField id="test" onChangeHandler={jest.fn()} value={null} />
          </Form>,
        );
        expect(mountedWrapper).toMatchSnapshot();
    });

    it('should pass validation error to form item', () => {
        const mountedWrapper = mount(
          <Form {...props} validationErrors={{ test: 'Validation error' }}>
            <InputField id="test" onChangeHandler={jest.fn()} value={null} />
          </Form>,
        );
        expect(mountedWrapper.find(InputField).prop('validationError')).toBe('Validation error');
        expect(mountedWrapper.find(Button).prop('disabled')).toBe(true);
    });

    it('should submit button should ignore validation when always enabled', () => {
        const mountedWrapper = mount(
          <Form {...props} validationErrors={{ test: 'Validation error' }}>
            <InputField id="test" onChangeHandler={jest.fn()} value={null} />
          </Form>,
        );
        mountedWrapper.setProps({ alwaysEnableSubmitButton: true });
        expect(mountedWrapper.find(Button).prop('disabled')).toBe(false);
    });
});
