// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Image from '../image';

describe('The Image component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            src: './test_image.png'
        };
        wrapper = shallow(<Image {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
