// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ContextMenuItem from '../context_menu_item';
import Button from '../button';


describe('The ContextMenuItem component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            label: 'Menu item',
            onClickHandler: jest.fn(),
            onCloseMenuHandler: jest.fn(),
        };
        wrapper = shallow(<ContextMenuItem {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onClickHandler).not.toHaveBeenCalled();
    });

    it('should call the click handler when item is clicked', () => {
        wrapper.find(Button).props().onClickHandler();
        expect(props.onClickHandler).toHaveBeenCalled();
        expect(props.onCloseMenuHandler).toHaveBeenCalled();
    });

    it('should render item as disabled', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);
    });
});
