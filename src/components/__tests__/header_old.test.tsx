// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import HeaderOld from '../header_old';

describe('The Header component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<HeaderOld />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
