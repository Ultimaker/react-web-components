// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { UserAccountMenu, UserAccountMenuProps } from '../user_account_menu';
import DropDownMenuBase from '../drop_down_menu_base';

describe('The UserAccountMenu component', () => {
    let props: UserAccountMenuProps;
    let wrapper;

    beforeEach(() => {
        props = {
            manageAccountURL: 'https://account-staging.ultimaker.com',
            onSignOutClickHandler: jest.fn(),
            onSignInClickHandler: jest.fn(),
            displayName: 'Test User',
            signedOut: false,
            accountHeaderText: 'My Account',
            accountButtonText: 'Manage account',
            signOutButtonText: 'Sign out',
            signInButtonText: 'Sign in',
        };
        wrapper = shallow(<UserAccountMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onSignOutClickHandler).not.toHaveBeenCalled();
    });

    it('should display other section', () => {
        wrapper.setProps({ children: <div>Child section</div> });
        expect(wrapper).toMatchSnapshot();
    });

    it('should show menu when the trigger is clicked', () => {
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        expect(wrapper.find(DropDownMenuBase).prop('showMenu')).toBe(true);
    });

    it('should sign out when sign out button is clicked', () => {
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        wrapper.find('#account-menu-sign-out-button').props().onClickHandler();
        expect(wrapper.find(DropDownMenuBase).prop('showMenu')).toBe(false);
        expect(props.onSignOutClickHandler).toBeCalled();
    });

    it('should render sign in button', () => {
        wrapper.setProps({ signedOut: 'true' });
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        expect(wrapper).toMatchSnapshot();
        expect(props.onSignInClickHandler).not.toHaveBeenCalled();
    });

    it('should sign in when sign in button is clicked', () => {
        wrapper.setProps({ signedOut: 'true' });
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        wrapper.find('#account-menu-sign-in-button').props().onClickHandler();
        expect(wrapper.find(DropDownMenuBase).prop('showMenu')).toBe(false);
        expect(props.onSignInClickHandler).toBeCalled();
    });
});
