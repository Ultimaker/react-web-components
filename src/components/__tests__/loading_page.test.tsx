// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import LoadingPage from '../loading_page';

describe('The LoadingPage component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LoadingPage />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
