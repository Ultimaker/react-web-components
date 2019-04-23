// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Header from '../header';
import Button from '../button';

describe('The Header component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should toggle the mobile navigation', () => {
        expect(wrapper.state('showMobileMenu')).toBe(false);
        wrapper.find(Button).props().onClickHandler();
        expect(wrapper.state('showMobileMenu')).toBe(true);
        wrapper.find(Button).props().onClickHandler();
        expect(wrapper.state('showMobileMenu')).toBe(false);
    });
});
