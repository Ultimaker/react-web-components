// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ContextMenu, { ContextMenuProps } from '../context_menu';
import DropDownMenuBase from '../drop_down_menu_base';


describe('The ContextMenu component', () => {
    let props: ContextMenuProps;
    let wrapper;

    beforeEach(() => {
        props = {
            showMenu: false,
            onToggleMenuHandler: jest.fn(),
            menuWidth: 200,
            children: null,
        };
        wrapper = shallow(<ContextMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render as disabled', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper).toMatchSnapshot();
    });

    it('should render to right', () => {
        wrapper.setProps({ menuOffsetDirection: 'right' });
        expect(wrapper.find(DropDownMenuBase).prop('menuStyle').left).toBe(-24);
        expect(wrapper.find(DropDownMenuBase).prop('menuStyle').right).toBeUndefined();
    });

    it('should render to north', () => {
        wrapper.setProps({ menuDirection: 'north' });
        expect(wrapper.find(DropDownMenuBase).prop('menuDirection')).toBe('north');
    });

    it('should render for a panel', () => {
        wrapper.setProps({ positionMenuInPanel: true });
        expect(wrapper.find('.context-menu--panel')).toHaveLength(1);
    });

    it('should pass showMenu down', () => {
        wrapper.setProps({ showMenu: true });
        expect(wrapper.find(DropDownMenuBase).prop('showMenu')).toBe(true);
    });

    it('should call onToggleMenuHandler when the trigger is clicked', () => {
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        expect(props.onToggleMenuHandler).toHaveBeenCalled();
    });

    it('should not call onToggleMenuHandler when the trigger is clicked if disabled', () => {
        wrapper.setProps({ disabled: true });
        wrapper.find(DropDownMenuBase).props().onToggleMenuHandler(true);
        expect(props.onToggleMenuHandler).not.toHaveBeenCalled();
    });
});
