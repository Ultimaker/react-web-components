// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { AboutDialog, AboutDialogProps } from '../about_dialog';

describe('The AboutDialog component', () => {
    let props: AboutDialogProps;
    let wrapper;

    beforeEach(() => {
        props = {
            closeHandler: jest.fn(),
            componentsList: [{
                name: 'testComponent',
                license: 'MIT',
                url: 'https://ultimaker.com/',
            }],
            versionNumber: '1.0.0',
            headerText: 'About',
            packagesPreText: 'This app uses the following Open Source components:',
            licensePreText: 'license',
            versionPreText: 'Version',
        };
        wrapper = shallow(<AboutDialog {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.closeHandler).not.toHaveBeenCalled();
    });
});
