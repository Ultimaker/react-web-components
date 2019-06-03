// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { SubNavigationMenuItem, SubNavigationMenuItemProps } from '../sub_navigation_menu_item';

describe('The SubNavigationMenuItem component', () => {
    let props: SubNavigationMenuItemProps;
    let wrapper;

    beforeEach(() => {
        props = {
            path: '/home',
            label: 'Home',
            onCloseMenuHandler: jest.fn(),
        };
        wrapper = shallow(<SubNavigationMenuItem {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
