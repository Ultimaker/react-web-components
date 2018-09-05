// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Spinner from '../spinner';

describe('The Spinner component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Spinner />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
