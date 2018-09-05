// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DropDownMenuItem from '../drop_down_menu_item';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


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
        wrapper.simulate('click', mockClickEvent);
        expect(props.onClickHandler).toHaveBeenCalled();
    });

    it('should not call the click handler when item is disabled', () => {
        wrapper.setProps({ disabled: true });
        wrapper.simulate('click', mockClickEvent);
        expect(props.onClickHandler).not.toHaveBeenCalled();
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });

    it('should render item as disabled', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);
    });

});
