// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import App from '../app';

describe('The App component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            fixedHeader: true,
        };
        wrapper = shallow(<App {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
