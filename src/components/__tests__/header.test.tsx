// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Navigation from '../navigation';
import Header from '../header';
import Button from '../button';

describe('The Header component', () => {
    let wrapper;

    beforeEach(() => {
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
            <Header>
                <Navigation {...navProps} />
            </Header>,
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
            <Header>
                <Navigation {...navProps} />
            </Header>,
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
});
