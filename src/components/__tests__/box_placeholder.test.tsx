// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import BoxPlaceholder from '../box_placeholder';

describe('The BoxPlaceholder component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            size: '10rem',
        };
        wrapper = shallow(<BoxPlaceholder {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
