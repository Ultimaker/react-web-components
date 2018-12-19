// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { DropDownMenuBase, DropDownMenuBaseProps } from '../drop_down_menu_base';
import DropDownMenuItem from '../drop_down_menu_item';

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
        wrapper.find('.drop-down-menu-base__trigger').props().onClickHandler();
        expect(props.onToggleMenuHandler).toBeCalledWith(true);
    });

    it('should not propagate click', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });
});
