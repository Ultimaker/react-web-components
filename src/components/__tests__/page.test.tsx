// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Page from '../page';

describe('The Page component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Page {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
