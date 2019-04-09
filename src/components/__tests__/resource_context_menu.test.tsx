// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ResourceContextMenu, { ResourceContextMenuProps } from '../resource_context_menu';
import ContextMenu from '../context_menu';
import ContextMenuItem from '../context_menu_item';

describe('The ResourceContextMenu component', () => {
    let props: ResourceContextMenuProps;
    let wrapper;

    beforeEach(() => {
        props = {
            resource: {
                resourceId: '1',
                title: 'Printer 1',
                imageUrl: '../images/logobot-placeholder-dark.svg',
                imageAlt: 'Printer 1',

                menuItems: [{
                    id: 'test_id',
                    label: 'Share',
                    handler: jest.fn(),
                    disabled: false,
                }],
            },
        };
        wrapper = shallow(<ResourceContextMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should toggle the context menu', () => {
        wrapper.find(ContextMenu).props().onToggleMenuHandler();
        expect(wrapper.find(ContextMenu).props().showMenu).toBe(true);
        wrapper.find(ContextMenu).props().onToggleMenuHandler();
        expect(wrapper.find(ContextMenu).props().showMenu).toBe(false);
    });

    it('should handle the context menu item on click', () => {
        wrapper.find(ContextMenuItem).props().onClickHandler();
        expect(props.resource.menuItems[0].handler).toHaveBeenCalled();
    });
});
