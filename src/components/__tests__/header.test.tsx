// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// component
import Navigation from '../navigation';
import Header from '../header';
import Button from '../button';
import AppSwitcherMenu from '../app_switcher_menu';

describe('The Header component', () => {
    let wrapper;

    beforeEach(() => {
        window.scrollTo = jest.fn();
        wrapper = shallow(<Header />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should add props to navigation component', () => {
        const navProps = {
            navLinks: [
                {
                    path: '/home',
                    label: 'Home',
                    visible: true,
                },
            ],
            accountNavText: 'Account',
            signOutNavText: 'Sign out',
            onCloseMobileMenuHandler: null,
            showMobileMenu: null,
        };
        wrapper = shallow(
            <Header
                navigation={<Navigation {...navProps} />}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should be able to use props to navigation component', () => {
        const navProps = {
            navLinks: [
                {
                    path: '/home',
                    label: 'Home',
                    visible: true,
                },
            ],
            accountNavText: 'Account',
            signOutNavText: 'Sign out',
            onCloseMobileMenuHandler: null,
            showMobileMenu: null,
        };
        wrapper = shallow(
            <Header
                navigation={<Navigation {...navProps} />}
            />,
        );

        expect(wrapper.find(Navigation).props().showMobileMenu).toBe(false);
        wrapper.find(Button).props().onClickHandler();
        expect(wrapper.find(Navigation).props().showMobileMenu).toBe(true);
        wrapper.find(Navigation).props().onCloseMobileMenuHandler();
        expect(wrapper.find(Navigation).props().showMobileMenu).toBe(false);
    });

    it('should render the user account menu', () => {
        wrapper.setProps({
            userAccountMenu: <div className="test-user-account-menu" />,
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('should add props to app switcher component', () => {
        const appSwitcherProps = {
            appsList: [
                {
                    application_type: 'internal',
                    name: 'My Cloud Portal',
                    url: 'https://mycloud-staging.ultimaker.com',
                },
            ],
        };
        wrapper = shallow(
            <Header
                applicationSwitcher={(
                    <AppSwitcherMenu {...appSwitcherProps} />
                )}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should be able to use props to app switcher component', () => {
        const appSwitcherProps = {
            appsList: [
                {
                    application_type: 'internal',
                    name: 'My Cloud Portal',
                    url: 'https://mycloud-staging.ultimaker.com',
                },
            ],
        };
        wrapper = shallow(
            <Header
                applicationSwitcher={(
                    <AppSwitcherMenu {...appSwitcherProps} />
                )}
            />,
        );

        expect(wrapper.find(AppSwitcherMenu).props().showMenu).toBe(false);
        wrapper.find(AppSwitcherMenu).props().onToggleMenuHandler(true);
        expect(wrapper.find(AppSwitcherMenu).props().showMenu).toBe(true);
        wrapper.find(AppSwitcherMenu).props().onToggleMenuHandler(false);
        expect(wrapper.find(AppSwitcherMenu).props().showMenu).toBe(false);
    });

    it('should allow the background to scroll after unmount', () => {
        const mountedWrapper = mount(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
        );
        document.body.classList.add('noscroll-xs');
        mountedWrapper.unmount();
        expect(document.body.classList.contains('noscroll')).toBe(false);
    });
});
