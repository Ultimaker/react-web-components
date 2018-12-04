// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import CircleIcon from '../circle_icon';

describe('The CircleIcon component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CircleIcon {...props}>1</CircleIcon>);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
