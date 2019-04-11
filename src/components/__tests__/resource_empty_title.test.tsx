// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ResourceEmptyTile, { ResourceEmptyTileProps } from '../resource_empty_tile';

describe('The ResourceEmptyTile component', () => {
    let props: ResourceEmptyTileProps;
    let wrapper;

    beforeEach(() => {
        props = {
            imageUrl: '../../images/logobot-placeholder-dark.svg',
            imageAlt: 'My devices',
            createButtonText: 'Add printers',
            onCreateHandler: jest.fn(),
        };
        wrapper = shallow(<ResourceEmptyTile {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
