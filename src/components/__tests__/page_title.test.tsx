// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { PageTitle, PageTitleProps } from '../page_title';
import BetaPill from '../beta_pill';

describe('The PageTitle component', () => {
    let props: PageTitleProps;
    let wrapper;

    beforeEach(() => {
        props = {
            title: 'Page title',
        };
        wrapper = shallow(<PageTitle {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render beta flag', () => {
        wrapper.setProps({ isBeta: true });
        expect(wrapper.find(BetaPill)).toHaveLength(1);
    });
});
