// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import GridItem from '../grid_item';

describe('The GridItem component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<GridItem {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
