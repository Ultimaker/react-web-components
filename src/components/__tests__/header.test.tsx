// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Header from '../header';

describe('The Header component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
