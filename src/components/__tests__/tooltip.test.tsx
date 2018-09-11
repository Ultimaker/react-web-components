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
        expect(wrapper.find('.tooltip-trigger--south').exists()).toEqual(false);
    });

    it('should disable the tooltip', () => {
        wrapper.setProps({ disableTooltip: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);
    });

});
