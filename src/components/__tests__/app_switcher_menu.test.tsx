// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { AppSwitcherMenu, AppSwitcherMenuProps } from '../app_switcher_menu';
import DropDownMenuBase from '../drop_down_menu_base';
import SlideInPanel from '../slide_in_panel';

describe('The AppSwitcherMenu component', () => {
    let props: AppSwitcherMenuProps;
    let wrapper;

    beforeEach(() => {
        props = {
            appsList: [
                {
                    application_type: 'internal',
                    name: 'My Cloud Portal',
                    url: 'https://mycloud-staging.ultimaker.com',
                },
                {
                    application_type: 'internal',
                    name: 'Account',
                    url: 'https://account-staging.ultimaker.com',
                },
                {
                    application_type: 'internal',
                    name: 'Marketplace Portal',
                    url: 'https://contribute-staging.ultimaker.com',
                },
                {
                    application_type: 'external',
                    name: 'Ultimaker Community',
                    url: 'https://community.ultimaker.com',
                },
                {
                    application_type: 'external',
                    name: 'Ultimaker.com',
                    url: 'https://ultimaker.com',
                },
            ],
            onToggleMenuHandler: jest.fn(),
            showMenu: false,
        };
        wrapper = shallow(<AppSwitcherMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should toggle menu visibility on desktop', () => {
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        expect(props.onToggleMenuHandler).toHaveBeenCalledWith(true);
    });

    it('should toggle menu visibility on mobile', () => {
        wrapper.find('.app-switcher-menu__mobile-trigger').props().onClickHandler();
        expect(props.onToggleMenuHandler).toHaveBeenCalledWith(true);
    });

    it('should hide menu when mobile menu overlay is clicked', () => {
        wrapper.find(SlideInPanel).props().onOverlayClickHandler();
        expect(props.onToggleMenuHandler).toHaveBeenCalledWith(false);
    });

    it('should hide menu visibility when externial link is clicked', () => {
        wrapper.find('.drop-down-menu-base__item').at(3).props().onClickHandler();
        expect(props.onToggleMenuHandler).toHaveBeenCalledWith(false);
    });
});
