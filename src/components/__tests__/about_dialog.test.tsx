// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import AboutDialog from '../about_dialog';

describe('The AboutDialog component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            closeHandler: jest.fn(),
            componentsList: [{
                name: 'testComponent',
                license: 'MIT',
                url: 'https://ultimaker.com/',
            }],
            appName: 'test app',
            versionNumber: '1.0.0',
            supportLinkURL: 'https://ultimaker.support.com/',
            supportLinkText: 'Support link'
        };
        wrapper = shallow(<AboutDialog {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.closeHandler).not.toHaveBeenCalled();
    });

});
