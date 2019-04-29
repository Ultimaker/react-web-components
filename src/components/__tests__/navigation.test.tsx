// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter, NavLink } from 'react-router-dom';

// component
import { Navigation, NavigationProps } from '../navigation';
import SlideOutContainer from '../slide_out_container';

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

    it('should render sign out button', () => {
        wrapper = shallow(
            <BrowserRouter>
                <Navigation {...props} onSignOutClickHandler={jest.fn()} />
            </BrowserRouter>,
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('should render manage account button', () => {
        wrapper = shallow(
            <BrowserRouter>
                <Navigation {...props} manageAccountURL="https://account.ultimaker.com/" />
            </BrowserRouter>,
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('should close mobile navigation menu when navigating', () => {
        wrapper = shallow(<Navigation {...props} />);
        wrapper.find(NavLink).first().props().onClick();
        expect(props.onCloseMobileMenuHandler).toBeCalled();
    });

    it('should show account mobile navigation menu', () => {
        wrapper = shallow(<Navigation {...props} />);
        expect(wrapper.find(SlideOutContainer).props().isOpen).toBe(false);
        wrapper.find(SlideOutContainer).props().onHeaderClick();
        expect(wrapper.find(SlideOutContainer).props().isOpen).toBe(true);
    });

    it('should render navigation label', () => {
        wrapper = shallow(<Navigation {...props} navLabel="Nav Label" />);
        expect(wrapper.find('.navigation__label').text()).toBe('Nav Label');
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
