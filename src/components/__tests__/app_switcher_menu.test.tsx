// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { AppSwitcherMenu, AppSwitcherMenuProps } from '../app_switcher_menu';

describe('The AppSwitcherMenu component', () => {
    let props: AppSwitcherMenuProps;
    let wrapper;

    beforeEach(() => {
        props = {
            appsList: [
                {
                    application_type: 'internal',
                    name: 'My Cloud Portal',
                    url: 'https://mycloud-staging.ultimaker.com',
                },
                {
                    application_type: 'internal',
                    name: 'Account',
                    url: 'https://account-staging.ultimaker.com',
                },
                {
                    application_type: 'internal',
                    name: 'Marketplace Portal',
                    url: 'https://contribute-staging.ultimaker.com',
                },
                {
                    application_type: 'external',
                    name: 'Ultimaker Community',
                    url: 'https://community.ultimaker.com',
                },
                {
                    application_type: 'external',
                    name: 'Ultimaker.com',
                    url: 'https://ultimaker.com',
                },
            ],
        };
        wrapper = shallow(<AppSwitcherMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
