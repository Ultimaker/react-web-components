// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import { UnmountClosed } from 'react-collapse';

// component
import SlideOutContainer from '../slide_out_container';
import PanelArrow from '../panel_arrow';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock'

describe('The SlideOutContainer component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            isOpen: false,
            onHeaderClick: jest.fn(),
            headerText: 'Test panel'
        };
        wrapper = shallow(<SlideOutContainer {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onHeaderClick).not.toHaveBeenCalled();
    });

    it('calls onHeaderClick when the header clicked', () => {
        wrapper.find('.slide-out-container__header').simulate('click', mockClickEvent);
        expect(props.onHeaderClick).toHaveBeenCalled();
    });

    it('should render a PanelArrow', () => {
        wrapper.setProps({ showHeaderPanelArrow: true });
        expect(wrapper.find(PanelArrow)).toHaveLength(1);
    });

    it('should open the panel', () => {
        wrapper.setProps({ isOpen: true });
        expect(wrapper.find(UnmountClosed).prop('isOpened')).toBe(true);
    });

    it('should hide the header panel', () => {
        wrapper.setProps({ headerText: null });
        expect(wrapper.find('.slide-out-container__header').exists()).toBe(false);
    });

});
