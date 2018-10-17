// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Popup from '../popup';
import ProgressBar from '../progress_bar';

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
        expect(wrapper).toMatchSnapshot();
        expect(props.primaryBtnHandler).not.toHaveBeenCalled();
        expect(props.secondaryBtnHandler).not.toHaveBeenCalled();
    });

    it('should render children', () => {
        wrapper.setProps({ children: <div className="child"></div> });
        expect(wrapper.find('.child')).toHaveLength(1);
    });

    it('should call primaryBtnHandler', () => {
        wrapper.instance()._primaryBtnHandler();
        expect(props.primaryBtnHandler).toHaveBeenCalled();
        expect(wrapper.state('primaryBtnShowSpinner')).toBe(true);
    });

    it('should call secondaryBtnHandler', () => {
        wrapper.instance()._secondaryBtnHandler();
        expect(props.secondaryBtnHandler).toHaveBeenCalled();
        expect(wrapper.state('secondaryBtnShowSpinner')).toBe(true);
    });

    it('should reset primary button spinner when there are validation errors', () => {
        wrapper.setState({ primaryBtnShowSpinner: true });
        wrapper.setProps({ validationErrors: {} })
        expect(wrapper.state('primaryBtnShowSpinner')).toBe(false);
    });

    it('should reset secondary button spinner when there are validation errors', () => {
        wrapper.setState({ secondaryBtnShowSpinner: true });
        wrapper.setProps({ validationErrors: {} })
        expect(wrapper.state('secondaryBtnShowSpinner')).toBe(false);
    });

    it('should render a progress bar for multi-step popups', () => {
        wrapper.setProps({ step: 1, totalSteps: 3 });
        expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });
});
