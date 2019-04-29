// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Divider, { DividerProps } from '../divider';

describe('The Divider component', () => {
    let props: DividerProps;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Divider {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render vertically', () => {
        wrapper.setProps({
            direction: 'vertical',
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should set the divider width', () => {
        wrapper.setProps({
            width: '1px',
        });
        expect(wrapper.prop('style')).toEqual({ borderWidth: '1px', height: '1px' });
    });

    it('should set the divider height', () => {
        wrapper.setProps({
            width: '1px',
            direction: 'vertical',
        });
        expect(wrapper.prop('style')).toEqual({ borderWidth: '1px', width: '1px' });
    });
});
