// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SubResourceItem, { SubResourceItemProps } from '../sub_resource_item';

describe('The SubResourceItem component', () => {
    let props: SubResourceItemProps;
    let wrapper;

    beforeEach(() => {
        props = {
            subResource: {
                subResourceId: '1',
                name: 'Test',
                showName: true,
            },
        };
        wrapper = shallow(<SubResourceItem {...props} />);
    });

    it('should render names', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render icons', () => {
        wrapper.setProps({
            subResource: {
                subResourceId: '1',
                name: 'Test',
                showIcon: true,
                iconUrl: '../../images/logobot-placeholder-dark.svg',
            },
        });
        expect(wrapper).toMatchSnapshot();
    });
});
