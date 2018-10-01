// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputFieldLabel from '../input_field_label';

describe('The InputFieldLabel component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            type: 'text',
            label: 'Input label',
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm'
        };
        wrapper = shallow(<InputFieldLabel {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render pre label element before the label', () => {
        wrapper.setProps({ preLabelElement: <div className="pre-label-element" /> });
        expect(wrapper).toMatchSnapshot();
    });

    it('should not render empty label', () => {
        wrapper.setProps({ label: null });
        expect(wrapper.text()).toEqual("");
    });

    it('should render info tooltip', () => {
        wrapper.setProps({ infoText: 'Test tooltip text' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render info link', () => {
        wrapper.setProps({ infoLinkURL: 'https://ultimaker.com/' });
        expect(wrapper).toMatchSnapshot();
    });
});
