// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DropDownMenuItem from '../drop_down_menu_item';
import Button from '../button';

describe('The DropDownMenuItem component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            active: false,
            onClickHandler: jest.fn(),
        };
        wrapper = shallow(<DropDownMenuItem {...props}>Menu item</DropDownMenuItem>);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onClickHandler).not.toHaveBeenCalled();
    });

    it('should call the click handler when item is clicked', () => {
        wrapper.find(Button).props().onClickHandler();
        expect(props.onClickHandler).toHaveBeenCalled();
    });

    it('should render item as disabled', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);
    });
});
