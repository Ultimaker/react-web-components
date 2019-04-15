// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import MorePill, { MorePillProps } from '../more_pill';

describe('The MorePill component', () => {
    let props: MorePillProps;
    let wrapper;

    beforeEach(() => {
        props = {
            names: ['test 1', 'test 2', 'test 3'],
        };
        wrapper = shallow(<MorePill {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
