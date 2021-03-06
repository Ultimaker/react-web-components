// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SlideOutContainer from '../slide_out_container';
import PanelArrow from '../panel_arrow';
import Button from '../button';

describe('The SlideOutContainer component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            isOpen: false,
            onHeaderClick: jest.fn(),
            headerText: 'Test panel',
        };
        wrapper = shallow(<SlideOutContainer {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onHeaderClick).not.toHaveBeenCalled();
    });

    it('calls onHeaderClick when the header clicked', () => {
        wrapper.find('.slide-out-container__header').find(Button).props().onClickHandler();
        expect(props.onHeaderClick).toHaveBeenCalled();
    });

    it('should render a PanelArrow', () => {
        wrapper.setProps({ showHeaderPanelArrow: true });
        expect(wrapper.find(PanelArrow)).toHaveLength(1);
    });

    it('should open the panel', () => {
        wrapper.setProps({ isOpen: true });
        expect(wrapper).toMatchSnapshot();
    });

    it('should hide the header panel', () => {
        wrapper.setProps({ headerText: null });
        expect(wrapper.find('.slide-out-container__header').exists()).toBe(false);
    });
});
