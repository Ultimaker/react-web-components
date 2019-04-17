// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

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
            accountNavText: 'Account',
            signOutNavText: 'Sign out',
        };
        wrapper = shallow(<BrowserRouter><Navigation {...props} /></BrowserRouter>);
    });

    it('should render', () => {
        expect(wrapper.render()).toMatchSnapshot();
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
});
