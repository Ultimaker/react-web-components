// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ProgressBar from '../progress_bar';

describe('The ProgressBar component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            progressPercentage: 50,
        };
        wrapper = shallow(<ProgressBar {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
