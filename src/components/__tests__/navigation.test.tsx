// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { Navigation, NavigationProps } from '../navigation';

describe('The Navigation component', () => {
    let props: NavigationProps;
    let wrapper;

    beforeEach(() => {
        props = {
            navLinks: [
                {
                    path: '/home',
                    label: 'Home',
                    visible: true,
                },
            ],
            accountButtonText: 'Account',
            signOutButtonText: 'Sign out',
            onCloseMobileMenuHandler: jest.fn(),
            showMobileAccountNav: true,
        };
        wrapper = shallow(<Navigation {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render when signed out', () => {
        wrapper.setProps({
            signedOut: true,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render without mobile account navigation', () => {
        wrapper.setProps({
            showMobileAccountNav: false,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render navigation label', () => {
        wrapper = shallow(<Navigation {...props} navLabel="Nav Label" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should not render desktop navigation if no visible links or label', () => {
        wrapper.setProps({
            navLinks: [
                {
                    path: '/home',
                    label: 'Home',
                    visible: false,
                },
            ],
        });
        expect(wrapper).toMatchSnapshot();
    });
});
