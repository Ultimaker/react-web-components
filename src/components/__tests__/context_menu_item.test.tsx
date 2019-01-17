// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { ContextMenuItem, ContextMenuItemProps } from '../context_menu_item';


describe('The ContextMenuItem component', () => {
    let props: ContextMenuItemProps;
    let wrapper;

    beforeEach(() => {
        props = {
            onClickHandler: jest.fn(),
        };
        wrapper = shallow(<ContextMenuItem {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onClickHandler).not.toHaveBeenCalled();
    });
});
