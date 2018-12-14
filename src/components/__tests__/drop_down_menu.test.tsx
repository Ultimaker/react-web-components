// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DropDownMenu from '../drop_down_menu';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


describe('The DropDownMenu component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            activeLabel: 'Active label',
        };
        wrapper = shallow(<DropDownMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should show menu when the label is clicked', () => {
        wrapper.find('.label').props().onClickHandler();
        expect(wrapper.find('.visible')).toHaveLength(1);
    });

    it('should hide menu when the label is clicked', () => {
        wrapper.find('.label').props().onClickHandler();
        expect(wrapper.find('.visible')).toHaveLength(1);
        wrapper.find('.label').props().onClickHandler();
        expect(wrapper.find('.visible').exists()).toBe(false);
    });

    it('should not propagate click', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });
});
