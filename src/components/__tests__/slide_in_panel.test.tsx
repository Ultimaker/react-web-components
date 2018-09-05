// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SlideInPanel from '../slide_in_panel';

describe('The SlideInPanel component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            headerTitle: 'Panel title',
            isOpen: false,
        };
        wrapper = shallow(<SlideInPanel {...props}>
            <div>Body</div>
            <div>Footer</div>
        </SlideInPanel>);
    });

    it('should render', () => {
        expect(wrapper.render()).toMatchSnapshot();
    });

});
