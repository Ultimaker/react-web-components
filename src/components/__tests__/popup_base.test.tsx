// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import PopupBase from '../popup_base';
import ProgressBar from '../progress_bar';


describe('The PopupBase component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
        };
        wrapper = shallow(<PopupBase {...props} />);
    });

    it('should render a modal', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render children', () => {
        wrapper.setProps({ children: <div className="child" /> });
        expect(wrapper.find('.child')).toHaveLength(1);
    });

    it('should render a progress bar for multi-step popupBases', () => {
        wrapper.setProps({ step: 1, totalSteps: 3 });
        expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });

    it('should render a footer', () => {
        wrapper.setProps({ footer: 'An error occurred!' });
        expect(wrapper.find('.popup__footer').prop('children')).toEqual('An error occurred!');
    });

    it('should render a header text', () => {
        wrapper.setProps({ headerText: 'PopupBase header' });
        expect(wrapper.find('.popup__header').prop('children')).toEqual('PopupBase header');
    });

    it('should render a header element', () => {
        wrapper.setProps({ headerElement: 'A header element' });
        expect(wrapper.find('.popup__header-element').prop('children')).toEqual('A header element');
    });
});
