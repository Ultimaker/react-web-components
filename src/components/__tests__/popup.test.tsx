// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Popup from '../popup';
import Button from '../button';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock'

describe('The Popup component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            headerText: 'Popup header',
            bodyText: 'Popup body',
            primaryBtnText: 'Primary button',
            primaryBtnHandler: jest.fn(),
            secondaryBtnHandler: jest.fn()
        };
        wrapper = shallow(<Popup {...props} />);
    });

    it('should render a confirm popup', () => {
        wrapper.setProps({ type: 'confirm' });
        expect(wrapper).toMatchSnapshot();
        expect(props.primaryBtnHandler).not.toHaveBeenCalled();
    });

    it('should render a prompt popup', () => {
        wrapper.setProps({ type: 'prompt' });
        expect(wrapper).toMatchSnapshot();
        expect(props.primaryBtnHandler).not.toHaveBeenCalled();
    });

    it('should call primaryBtnHandler when the popup is submitted', () => {
        wrapper.find('.popup').simulate('submit', mockClickEvent);
        expect(props.primaryBtnHandler).toHaveBeenCalled();
        expect(mockClickEvent.preventDefault).toBeCalled();
        expect(wrapper.state().primaryBtnSpinner).toEqual(true);
    });

    it('should call primaryBtnHandler when validation passes', () => {
        wrapper.setProps({ validationHandler: (value) => {return null} });
        wrapper.find('.popup').simulate('submit', mockClickEvent);
        expect(props.primaryBtnHandler).toHaveBeenCalled();
    });

    it('should not call primaryBtnHandler when validation passes', () => {
        wrapper.setProps({ validationHandler: (value) => {return 'Test validation error'} });
        wrapper.find('.popup').simulate('submit', mockClickEvent);
        expect(props.primaryBtnHandler).not.toHaveBeenCalled();
    });

    it('should render a secondary button', () => {
        wrapper.setProps({
            secondaryBtnText: 'secondaryBtnText'
        });
        expect(wrapper.find(Button)).toHaveLength(2);
        expect(props.secondaryBtnHandler).not.toHaveBeenCalled();
    });

    it('should call secondaryBtnHandler', () => {
        wrapper.instance()._secondaryBtnHandler();
        expect(props.secondaryBtnHandler).toHaveBeenCalled();
        expect(wrapper.state().secondaryBtnSpinner).toEqual(true);
    });

});
