// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Ratings from '../ratings';
import HighlightIcon from '../icons/highlight_icon'
import ApprovedIcon from '../icons/approved_icon'

describe('The Ratings component', () => {
    it('should render 4.3 of 5 highlight icons', () => {
        let wrapper = shallow(<Ratings max={5} rating={4.3} Icon={HighlightIcon} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a third of 10 approved icons', () => {
        let wrapper = shallow(<Ratings max={10} rating={10 / 3} Icon={ApprovedIcon} />);
        expect(wrapper).toMatchSnapshot();
    });
});
