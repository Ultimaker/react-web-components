// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import Tooltip from '../tooltip';

describe('The Tooltip component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            tooltipText: 'Tooltip text'
        };
        wrapper = shallow(<Tooltip {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render to north', () => {
        wrapper.setProps({ direction: 'north' });
        expect(wrapper.find('.tooltip-trigger--north')).toHaveLength(1);
        expect(wrapper.find('.tooltip-trigger--south').exists()).toBe(false);
    });

    it('should disable the tooltip', () => {
        wrapper.setProps({ disableTooltip: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);
    });

    it('should show the tooltip when hovered', () => {
        const mountedWrapper = mount(<Tooltip {...props} />);
        mountedWrapper.simulate('mouseEnter');
        expect(mountedWrapper.find('.show')).toHaveLength(1);
    });

    it('should hide the tooltip when no longer hovered', () => {
        const mountedWrapper = mount(<Tooltip {...props} />);
        mountedWrapper.simulate('mouseEnter');
        expect(mountedWrapper.find('.show')).toHaveLength(1);
        mountedWrapper.simulate('mouseLeave');
        expect(mountedWrapper.find('.show').exists()).toBe(false);
    });

    it('should show the tooltip when selected on touch device', () => {
        const mountedWrapper = mount(<Tooltip {...props} />);
        mountedWrapper.simulate('touchStart');
        expect(mountedWrapper.find('.show')).toHaveLength(1);
    });

    it('should hide the tooltip when unselected on touch device', () => {
        const mountedWrapper = mount(<Tooltip {...props} />);
        mountedWrapper.simulate('touchStart');
        expect(mountedWrapper.find('.show')).toHaveLength(1);
        mountedWrapper.simulate('touchEnd');
        expect(mountedWrapper.find('.show').exists()).toBe(false);
    });

    it('should offset the tooltip', () => {
        wrapper.setState({ tooltipOffset: 100 });
        expect(wrapper.find('.tooltip').prop('style').left).toBe(100);
    });
});
