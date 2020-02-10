// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputFieldWrapper, { InputFieldWrapperProps } from '../input_field_wrapper';

describe('The input field wrapper component', () => {
    let props: InputFieldWrapperProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputId',
            staticField: false,
            className: 'test-input-class',
            centerInputField: true,
            label: 'Test Input Label',
            labelLayoutWidth: '1/2',
            labelWidthBreakpoint: 'xs',
            infoLinkURL: 'http://info.url',
            infoText: 'Click for more info',
            preLabelElement: '*',
            required: true,
            submitted: false,
            validationError: 'A validation error!',
            showValidationError: true,
            touched: true,
            children: <div>child</div>,
            inputChildren: <div>input child</div>,
        };
        wrapper = shallow(<InputFieldWrapper {...props} />);
    });

    it('should render a wrapper with all options', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a static field', () => {
        wrapper.setProps({ required: false, staticField: true, touched: false });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a wrapper without any options', () => {
        props = {
            id: 'testInputId',
            touched: true,
            children: null,
            inputChildren: null,
        };
        wrapper = shallow(<InputFieldWrapper {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a wrapper without the validation error', () => {
        wrapper.setProps({ showValidationError: false });
        expect(wrapper).toMatchSnapshot();
    });
});
