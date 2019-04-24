// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// component
import { NavigationOld, NavigationOldProps } from '../navigation_old';

describe('The Navigation component', () => {
    let props: NavigationOldProps;
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
            accountNavText: 'Account',
            signOutNavText: 'Sign out',
        };
        wrapper = shallow(<BrowserRouter><NavigationOld {...props} /></BrowserRouter>);
    });

    it('should render', () => {
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('should render sign out button', () => {
        wrapper = shallow(
            <BrowserRouter>
                <NavigationOld {...props} onSignOutClickHandler={jest.fn()} />
            </BrowserRouter>,
        );
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('should render manage account button', () => {
        wrapper = shallow(
            <BrowserRouter>
                <NavigationOld {...props} manageAccountURL="https://account.ultimaker.com/" />
            </BrowserRouter>,
        );
        expect(wrapper.render()).toMatchSnapshot();
    });
});
