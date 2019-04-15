// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ResourceGrid, { ResourceGridProps } from '../../components/resource_grid';

describe('The ResourceGrid component', () => {
    let props: ResourceGridProps;
    let wrapper;

    beforeEach(() => {
        props = {
            emptyStateText: 'Get started by connecting your devices to the cloud',
            emptyStateImageUrl: '../../images/logobot-placeholder-dark.svg',
            emptyTileImageUrl: '../../images/logobot-placeholder-dark.svg',
            emptyStateImageAlt: 'My devices',
            emptyTileImageAlt: 'My devices',
            createButtonText: 'Add printers',
            onCreate: jest.fn(),
        };
        wrapper = shallow(<ResourceGrid {...props} />);
    });

    it('should render the empty state', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a grid', () => {
        wrapper.setProps({ children: <div>Test item</div> });
        expect(wrapper).toMatchSnapshot();
    });
});
