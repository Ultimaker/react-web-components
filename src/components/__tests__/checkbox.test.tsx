// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Checkbox from '../checkbox';

describe('The Checkbox component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testCheckbox',
            value: false,
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<Checkbox {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a checked checkbox', () => {
        wrapper.setProps({ value: true });
        expect(wrapper.find('input').props().checked).toBe(true);
    });
});
