// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Page from '../page';

describe('The Page component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            title: 'Page title',
            maxWidth: '100rem',
            id: 'page-id',
            className: 'page-class',
        };

        wrapper = shallow(<Page {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
