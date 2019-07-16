// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import SlideInPanel from '../slide_in_panel';

// utils
import * as toggleScrolling from '../../utils/toggle_scrolling'

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';

describe('The SlideInPanel component', () => {
    let props;
    let wrapper;
    let enableScrollingSpy;
    let disableScrollingSpy;

    beforeEach(() => {
        props = {
            headerTitle: 'Panel title',
            isOpen: false,
            onOverlayClickHandler: jest.fn(),
            includeFooter: true,
        };
        wrapper = shallow(
            <SlideInPanel {...props}>
                <div>Body</div>
                <div>Footer</div>
            </SlideInPanel>,
        );
        enableScrollingSpy = jest.spyOn(toggleScrolling, 'enableScrolling');
        disableScrollingSpy = jest.spyOn(toggleScrolling, 'disableScrolling');
    });

    it('should render', () => {
        expect(wrapper.render()).toMatchSnapshot();
        expect(props.onOverlayClickHandler).not.toHaveBeenCalled();
    });

    it('should show a footer', () => {
        wrapper.setProps({ includeFooter: false });
        expect(wrapper.find('.slide-in-panel__footer').exists()).toBe(false);
    });

    it('should call onOverlayClickHandler when the overlay is clicked', () => {
        wrapper.find('.slide-in-panel__overlay').simulate('click', mockClickEvent);
        expect(props.onOverlayClickHandler).toHaveBeenCalled();
    });

    it('should call onOverlayClickHandler when the overlay is clicked and onOverlayClickHandler is not passed', () => {
        wrapper.setProps({ onOverlayClickHandler: null });
        wrapper.find('.slide-in-panel__overlay').simulate('click', mockClickEvent);
        expect(props.onOverlayClickHandler).not.toHaveBeenCalled();
    });

    it('should render header labels', () => {
        wrapper.setProps({
            headerLabels: [
                { label: 'Test label' },
                { label: 'Test label with info', info: 'Test info' },
            ],
        });
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('should disable scrolling when opened', () => {
        wrapper.setProps({ isOpen: true });
        expect(disableScrollingSpy).toHaveBeenCalled();
        wrapper.setProps({ isOpen: false });
        expect(enableScrollingSpy).toHaveBeenCalled();
    });

    it('should re-enable scrolling after unmount', () => {
        wrapper.setProps({ isOpen: true });
        wrapper.unmount();
        expect(enableScrollingSpy).toHaveBeenCalled();
    });
});
