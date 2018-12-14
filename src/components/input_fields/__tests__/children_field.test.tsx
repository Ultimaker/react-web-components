// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ChildrenField, { ChildrenFieldProps } from '../children_field';

describe('The children field component', () => {
    let children;
    let props: ChildrenFieldProps;
    let wrapper;

    beforeEach(() => {
        children = <div>Children</div>;
        props = {
            id: 'testInputField',
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            children,
        };
        wrapper = shallow(<ChildrenField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.prop('children')).toEqual(children);
    });
});
