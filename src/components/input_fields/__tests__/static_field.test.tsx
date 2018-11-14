// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// components
import StaticField, {StaticFieldProps} from '../static_field';
import InputFieldWrapper from '../input_field_wrapper';

describe('The static field component', () => {
    let props: StaticFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            value: "2018",
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
        };
        wrapper = shallow(<StaticField {...props}>child</StaticField>);
    });

    it('should render an input wrapper', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render it's value and its children", () => {
        expect(wrapper.children().text()).toEqual("2018");
        expect(wrapper.find(InputFieldWrapper).prop('inputChildren')).toEqual("child");
    });

    it('should render a null', () => {
        wrapper.setProps({value: null})
        expect(wrapper.find(InputFieldWrapper).prop("value")).toBeNull();
    })
});
