// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ResourceTile, { ResourceTileProps } from '../resource_tile';

describe('The ResourceTile component', () => {
    let props: ResourceTileProps;
    let wrapper;

    beforeEach(() => {
        props = {
            resource: {
                resourceId: '1',
                title: 'Printer 1',
                imageUrl: '../images/logobot-placeholder-dark.svg',
                imageAlt: 'Printer 1',

                menuItems: [{
                    id: 'test_id',
                    label: 'Share',
                    handler: jest.fn(),
                    disabled: false,
                }],
            },
        };
        wrapper = shallow(<ResourceTile {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
