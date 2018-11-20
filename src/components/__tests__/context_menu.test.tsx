// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import ContextMenu from '../context_menu';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


describe('The ContextMenu component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            menuWidth: 200
        };
        wrapper = shallow(<ContextMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render to right', () => {
        wrapper.setProps({ menuOffsetDirection: 'right' });
        expect(wrapper.find('.menu').prop('style').left).toBe(-30);
        expect(wrapper.find('.menu').prop('style').right).toBeUndefined();
    });

    it('should render to north', () => {
        wrapper.setProps({ menuDirection: 'north' });
        expect(wrapper.find('.context-menu--north')).toHaveLength(1);
        expect(wrapper.find('.context-menu--south').exists()).toBe(false);
    });

    it('should render for a panel', () => {
        wrapper.setProps({ positionMenuInPanel: true });
        expect(wrapper.find('.context-menu--panel')).toHaveLength(1);
    });

    it('should show menu when the trigger is clicked', () => {
        wrapper.find('.trigger').simulate('click', mockClickEvent);
        expect(wrapper.find('.visible')).toHaveLength(1);
    });

    it('should hide menu when the trigger is clicked', () => {
        wrapper.find('.trigger').simulate('click', mockClickEvent);
        expect(wrapper.find('.visible')).toHaveLength(1);
        wrapper.find('.trigger').simulate('click', mockClickEvent);
        expect(wrapper.find('.visible').exists()).toBe(false);
    });

    it('should hide menu on menu click', () => {
        wrapper.find('.trigger').simulate('click', mockClickEvent);
        expect(wrapper.find('.visible')).toHaveLength(1);
        wrapper.find('.container').simulate('click', mockClickEvent);
        expect(wrapper.find('.visible').exists()).toBe(false);
    });

    it('should not propagate click', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });
});
