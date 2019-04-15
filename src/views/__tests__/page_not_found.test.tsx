// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import PageNotFoundView from '../page_not_found';

describe('The PageNotFoundView component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            location: {
                path: 'home',
            },
        };
        wrapper = shallow(<PageNotFoundView {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
