// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Divider from '../divider';

describe('The Divider component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Divider {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
