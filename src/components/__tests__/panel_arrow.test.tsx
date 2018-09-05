// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import PanelArrow from '../panel_arrow';

describe('The PanelArrow component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            width: '20px'
        };
        wrapper = shallow(<PanelArrow {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
