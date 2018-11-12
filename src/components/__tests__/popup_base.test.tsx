// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import PopupBase from '../popup_base';
import ProgressBar from '../progress_bar';
import Popup from '../popup'

describe('The PopupBase component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            headerText: 'PopupBase header',
        };
        wrapper = shallow(<PopupBase {...props} />);
    });

    it('should render a modal', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render children', () => {
        wrapper.setProps({ children: <div className="child"></div> });
        expect(wrapper.find('.child')).toHaveLength(1);
    });

    it('should render a progress bar for multi-step popupBases', () => {
        wrapper.setProps({ step: 1, totalSteps: 3 });
        expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });
    
    it('should render a footer', () => {
        wrapper.setProps({ footer: 'An error occurred!' });
        expect(wrapper.find('.popup__footer').prop('children')).toEqual('An error occurred!');
    })
});
