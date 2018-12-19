// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DropDownMenu from '../drop_down_menu';
import DropDownMenuBase from '../drop_down_menu_base';


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

    it('should show menu when the trigger is clicked', () => {
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        expect(wrapper.find(DropDownMenuBase).prop('showMenu')).toBe(true);
    });

    it('should render the error state', () => {
        wrapper.setProps({ error: true });
        expect(wrapper.find('.drop-down-menu--error')).toHaveLength(1);
    });
});
