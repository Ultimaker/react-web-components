// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { AppSwitcherTrigger, AppSwitcherTriggerProps } from '../app_switcher_trigger';

describe('The AppSwitcherTrigger component', () => {
    let props: AppSwitcherTriggerProps;
    let wrapper;

    beforeEach(() => {
        props = {
            isAppSwitcherOpen: false,
        };
        wrapper = shallow(<AppSwitcherTrigger {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should change when app switcher is open', () => {
        wrapper.setProps({
            isAppSwitcherOpen: true,
        });
        expect(wrapper.find('.app_switcher_trigger').hasClass('app_switcher_trigger--open')).toBe(true);
    });
});
