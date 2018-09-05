// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Tooltip from '../tooltip';

describe('The Tooltip component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            tooltipText: 'Tooltip text'
        };
        wrapper = shallow(<Tooltip {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
