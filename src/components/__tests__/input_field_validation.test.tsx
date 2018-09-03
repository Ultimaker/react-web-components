// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputFieldValidation from '../input_field_validation';

describe('The InputFieldValidation component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            validationError: 'Validation error',
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm'
        };
        wrapper = shallow(<InputFieldValidation {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should apply the correct positional class', () => {
        wrapper.setProps({ labelLayoutWidth: 'fill' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should apply the correct offset class', () => {
        wrapper.setProps({ labelLayoutWidth: '1/3' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should apply the correct offset class for the required icon', () => {
        wrapper.setProps({ labelLayoutWidth: 'fit', required: true });
        expect(wrapper).toMatchSnapshot();
    });

});
