// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter, NavLink } from 'react-router-dom';

// component
import { NavigationMobile, NavigationMobileProps } from '../navigation_mobile';

describe('The NavigationMobile component', () => {
    let props: NavigationMobileProps;
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
            accountButtonText: 'Account',
            signOutButtonText: 'Sign out',
            onCloseMobileMenuHandler: jest.fn(),
            showMobileAccountNav: true,
        };
        wrapper = shallow(<NavigationMobile {...props} />);
    });

    it('should render', () => {
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

    it('should close mobile navigation menu when navigating', () => {
        wrapper.find(NavLink).first().props().onClick();
        expect(props.onCloseMobileMenuHandler).toBeCalled();
    });

    it('should not call close handler if it is not passed', () => {
        wrapper.setProps({
            onCloseMobileMenuHandler: undefined,
        });
        wrapper.find(NavLink).first().props().onClick();
        expect(props.onCloseMobileMenuHandler).not.toBeCalled();
    });

    it('should render sign out button', () => {
        const onSignOutClickHandler = jest.fn();
        wrapper.setProps({
            onSignOutClickHandler,
        });
        expect(wrapper).toMatchSnapshot();
        wrapper.find('.navigation__account-sign-out-btn').props().onClickHandler();
        expect(onSignOutClickHandler).toBeCalled();
    });

    it('should render sign in button', () => {
        wrapper.setProps({
            signedOut: true,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render account link', () => {
        wrapper.setProps({
            manageAccountURL: '/signout',
        });
        expect(wrapper).toMatchSnapshot();
    });
});
