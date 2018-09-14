// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Loading from '../loading';

describe('The Loading component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            label: 'loading',
        };
        wrapper = shallow(<Loading {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
