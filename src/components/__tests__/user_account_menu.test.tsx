// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import UserAccountMenu from '../user_account_menu';

describe('The UserAccountMenu component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            manageAccountURL: 'https://account-staging.ultimaker.com',
            onSignOutClickHandler: jest.fn(),
            onSignInClickHandler: jest.fn(),
            displayName: 'Test User',
            signedOut: false,
        };
        wrapper = shallow(<UserAccountMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onSignOutClickHandler).not.toHaveBeenCalled();
    });

    it('should toggle the menu visibility when clicking the trigger', () => {
        wrapper.find('.trigger').props().onClickHandler();
        expect(wrapper.state('showMenu')).toBe(true);
        expect(wrapper.find('.visible')).toHaveLength(1);

        wrapper.find('.trigger').props().onClickHandler();
        expect(wrapper.state('showMenu')).toBe(false);
        expect(wrapper.find('.visible').exists()).toBe(false);
    });

    it('should display child section', () => {
        wrapper.setProps({ children: <div>Child section</div> });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render sign in button', () => {
        wrapper.setProps({ signedOut: 'true' });
        expect(wrapper).toMatchSnapshot();
        expect(props.onSignInClickHandler).not.toHaveBeenCalled();
    });
});
