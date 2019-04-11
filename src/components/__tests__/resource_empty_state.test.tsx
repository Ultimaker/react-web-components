// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ResourceEmptyState, { ResourceEmptyStateProps } from '../resource_empty_state';

describe('The ResourceEmptyState component', () => {
    let props: ResourceEmptyStateProps;
    let wrapper;

    beforeEach(() => {
        props = {
            text: 'Get started by connecting your devices to the cloud',
            imageUrl: '../../images/logobot-placeholder-dark.svg',
            imageAlt: 'My devices',
            createButtonText: 'Add printers',
            onCreateHandler: jest.fn(),
        };
        wrapper = shallow(<ResourceEmptyState {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
