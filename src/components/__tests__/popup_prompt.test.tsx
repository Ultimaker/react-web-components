// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import PopupPrompt from '../popup_prompt';
import Popup from '../popup';

describe('The PopupPrompt component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            headerText: 'PopupPrompt header',
            bodyText: 'PopupPrompt body',
            primaryBtnText: 'Primary button',
            primaryBtnHandler: jest.fn(),
        };
        wrapper = shallow(<PopupPrompt {...props} />);
    });

    it('should render a prompt popup', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.primaryBtnHandler).not.toHaveBeenCalled();
    });

    it('should set inputValue when the input is changed', () => {
        expect(wrapper.state('inputValue')).toBe(undefined);
        wrapper.instance()._onChangeHandler('promptInput', 10);
        expect(wrapper.state('inputValue')).toBe(10);
    });

    it('should set validationError when the input is changed and there is a validation error', () => {
        expect(wrapper.state('validationError')).toBe(undefined);
        wrapper.setProps({ validationHandler: () => 'Validation error' });
        wrapper.instance()._onChangeHandler('promptInput', 10);
        expect(wrapper.state('validationError')).toBe('Validation error');
    });

    it('should set inputValue to the default value', () => {
        wrapper = shallow(<PopupPrompt {...props} inputDefaultValue="Default value" />);
        expect(wrapper.state('inputValue')).toBe('Default value');
    });

    it('should call primaryBtnHandler', () => {
        props.primaryBtnHandler.mockReturnValue(1234);
        expect(wrapper.find(Popup).prop('primaryBtnHandler')()).toEqual(1234);
        expect(props.primaryBtnHandler).toHaveBeenCalled();
        expect(wrapper.find(Popup).prop('secondaryBtnHandler')).toEqual(props.secondaryBtnHandler);
    });

    it('should not call primaryBtnHandler when there is a validation error', () => {
        wrapper.setProps({ validationHandler: () => 'Validation error' });
        wrapper.instance()._primaryBtnHandler();
        expect(props.primaryBtnHandler).not.toHaveBeenCalled();
    });

    it('should pass a footer to the popup', () => {
        wrapper.setProps({ footer: 'An error occurred!' });
        expect(wrapper.find(Popup).prop('footer')).toEqual('An error occurred!');
    });
});
