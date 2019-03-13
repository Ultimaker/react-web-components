// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import BetaPill from '../beta_pill';

describe('The Header component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BetaPill />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
