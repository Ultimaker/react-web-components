// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { SubNavigationMenu, SubNavigationMenuProps } from '../sub_navigation_menu';

describe('The SubNavigationMenu component', () => {
    let props: SubNavigationMenuProps;
    let wrapper;

    beforeEach(() => {
        props = {
            menuLabel: 'Home',
            active: false,
            children: <div>Test</div>,
        };
        wrapper = shallow(<SubNavigationMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render as active', () => {
        wrapper.setProps({
            active: true,
        });
        expect(wrapper).toMatchSnapshot();
    });
});
