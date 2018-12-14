// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import GridEmpty from '../grid_empty';

describe('The GridEmpty component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            label: 'Empty grid',
        };
        wrapper = shallow(<GridEmpty {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
