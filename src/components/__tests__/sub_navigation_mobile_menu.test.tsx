// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { SubNavigationMobileMenu, SubNavigationMobileMenuProps } from '../sub_navigation_mobile_menu';
import SlideOutContainer from '../slide_out_container';

describe('The SubNavigationMobileMenu component', () => {
    let props: SubNavigationMobileMenuProps;
    let wrapper;

    beforeEach(() => {
        props = {
            menuLabel: 'Home',
        };
        wrapper = shallow(<SubNavigationMobileMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should show account mobile navigation menu', () => {
        expect(wrapper.find(SlideOutContainer).props().isOpen).toBe(false);
        wrapper.find(SlideOutContainer).props().onHeaderClick();
        expect(wrapper.find(SlideOutContainer).props().isOpen).toBe(true);
    });
});
