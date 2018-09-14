// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import Modal from '../modal';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


describe('The Modal component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            onOverlayClickHandler: jest.fn(),
        };
        wrapper = shallow(<Modal {...props} />);
    });

    it('should render a TransitionMotion', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onOverlayClickHandler).not.toHaveBeenCalled();
    });

    it('should render', () => {
        expect(wrapper.render()).toMatchSnapshot();
        expect(props.onOverlayClickHandler).not.toHaveBeenCalled();
    });

    it('should call onOverlayClickHandler when the overlay is clicked', () => {
        wrapper.dive().find('.modal').simulate('click', mockClickEvent);
        expect(props.onOverlayClickHandler).toHaveBeenCalled();
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });

    it('should call onOverlayClickHandler when the overlay is clicked and onOverlayClickHandler is not passed', () => {
        wrapper.setProps({ onOverlayClickHandler: null });
        wrapper.dive().find('.modal').simulate('click', mockClickEvent);
        expect(props.onOverlayClickHandler).not.toHaveBeenCalled();
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });

    it('should set isOpen to true after mounting', () => {
        expect(wrapper.state('isOpen')).toBe(true);
    });

    it('should not allow the background to scroll when open', () => {
        expect(document.body.classList.contains('noscroll')).toBe(true);
    });

    it('should allow the background to scroll after unmount', () => {
        const mountedWrapper = mount(<Modal {...props} />);
        mountedWrapper.unmount();
        expect(document.body.classList.contains('noscroll')).toBe(false);
    });

});
