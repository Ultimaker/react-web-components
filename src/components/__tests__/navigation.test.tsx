// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// component
import Navigation from '../navigation';

// views
import PageNotFoundView from '../../views/page_not_found';

describe('The Navigation component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            navLinks: [
                {
                    path: '/home',
                    label: 'Home',
                    visible: true,
                    component: PageNotFoundView
                }
            ]
        };
        wrapper = shallow(<BrowserRouter><Navigation {...props} /></BrowserRouter>);
    });

    it('should render', () => {
        expect(wrapper.render()).toMatchSnapshot();
    });

});
