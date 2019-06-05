// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { NavigationDesktop } from '../navigation_desktop';

describe('The NavigationDesktop component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            visibleNavLinks: [
                {
                    path: '/home',
                    label: 'Home',
                    visible: true,
                },
            ],
            location: {
                pathname: 'home',
            },
        };
        wrapper = shallow(<NavigationDesktop {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render navigation label', () => {
        wrapper.setProps({
            navLabel: 'Nav Label',
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render sub navigation', () => {
        wrapper.setProps({
            visibleNavLinks: [
                {
                    path: '/home',
                    label: 'Home',
                    visible: true,
                    subRoutes: [
                        {
                            path: '/home/teams',
                            label: 'Teams',
                        },
                        {
                            path: '/home/printers',
                            label: 'Printers',
                        },
                    ],
                },
            ],
        });
        expect(wrapper).toMatchSnapshot();
    });
});
