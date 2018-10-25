// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import UserAccountMenu from '../user_account_menu';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


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
        wrapper.find('.trigger').simulate('click', mockClickEvent);
        expect(wrapper.state('showMenu')).toBe(true);
        expect(wrapper.find('.visible')).toHaveLength(1);

        wrapper.find('.trigger').simulate('click', mockClickEvent);
        expect(wrapper.state('showMenu')).toBe(false);
        expect(wrapper.find('.visible').exists()).toBe(false);
    });

    it('should add _onOutsideClickHandler event listener', () => {
        document.addEventListener = jest.fn();
        expect(document.addEventListener).not.toHaveBeenCalled();
        wrapper.instance()._setShowMenu(true);
        expect(document.addEventListener).toHaveBeenCalledWith('mousedown', wrapper.instance()._onOutsideClickHandler);
    });

    it('should remove _onOutsideClickHandler event listener', () => {
        document.removeEventListener = jest.fn();
        expect(document.removeEventListener).not.toHaveBeenCalled();
        wrapper.instance()._setShowMenu(false);
        expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', wrapper.instance()._onOutsideClickHandler);
    });

    it('should not hide the menu when the menu is clicked', () => {
        wrapper.instance()._setShowMenu(true);
        wrapper.simulate('click', mockClickEvent);
        expect(mockClickEvent.stopPropagation).toBeCalled();
        expect(wrapper.find('.visible')).toHaveLength(1);
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
