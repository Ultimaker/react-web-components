// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { DropDownMenuBase, DropDownMenuBaseProps } from '../drop_down_menu_base';
import DropDownMenuItem from '../drop_down_menu_item';
import Button from '../button';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


describe('The DropDownMenuBase component', () => {
    let props: DropDownMenuBaseProps;
    let wrapper;

    beforeEach(() => {
        props = {
            showMenu: false,
            triggerElement: 'trigger',
            onToggleMenuHandler: jest.fn(),
            children: <DropDownMenuItem active={false} onClickHandler={jest.fn()} />,
        };
        wrapper = shallow(<DropDownMenuBase {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call toggle menu handler when the trigger is clicked', () => {
        wrapper.find(Button).props().onClickHandler();
        expect(props.onToggleMenuHandler).toBeCalledWith(true);
    });

    it('should call toggle menu handler when the trigger is clicked', () => {
        // open menu
        wrapper.find(Button).props().onClickHandler();
        expect(props.onToggleMenuHandler).toBeCalledWith(true);

        // close menu
        wrapper.setProps({ showMenu: true });
        wrapper.find(Button).props().onClickHandler();
        expect(props.onToggleMenuHandler).toBeCalledWith(false);
    });

    it('should render drop down menu north', () => {
        wrapper.setProps({ menuDirection: 'north' });
        expect(wrapper.find('.drop-down-menu-base--north').exists()).toBe(true);
        expect(wrapper.find('.drop-down-menu-base--south').exists()).toBe(false);
    });

    it('should render drop down menu open', () => {
        wrapper.setProps({ showMenu: true });
        expect(wrapper).toMatchSnapshot();
    });

    it('should pass in menuStyle', () => {
        wrapper.setProps({ menuStyle: { background: 'blue' } });
        expect(wrapper.find('.drop-down-menu-base__menu').prop('style')).toHaveProperty('background', 'blue');
    });

    it('should not propagate menu click', () => {
        wrapper.find('.drop-down-menu-base').props().onClick(mockClickEvent);
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });

    it('should call toggle menu handler when escape is pressed', () => {
        // TODO This test is now calling a private method of the component.
        // If the correct type is added to the wrapper, this will not be possible.
        // It is also not actually testing the functionality. Tests like this need to be revised.
        wrapper.instance()._keyPressHandler({ key: 'Escape' });
        expect(props.onToggleMenuHandler).toBeCalledWith(false);
    });
});
