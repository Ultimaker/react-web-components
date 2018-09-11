// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import UserAccountMenu from '../user_account_menu';

describe('The UserAccountMenu component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            manageAccountURL: 'https://account-staging.ultimaker.com',
            onSignOutClickHandler: jest.fn(),
            displayName: 'Test User'
        };
        wrapper = shallow(<UserAccountMenu {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onSignOutClickHandler).not.toHaveBeenCalled();
    });

});
