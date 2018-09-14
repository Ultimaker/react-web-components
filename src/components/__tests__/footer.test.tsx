// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Footer from '../footer';

describe('The Footer component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Footer>About</Footer>);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
