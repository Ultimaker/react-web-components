// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SubResourceList, { SubResourceListProps } from '../sub_resource_list';
import SubResourceItem from '../sub_resource_item';
import MorePill from '../more_pill';

describe('The SubResourceList component', () => {
    let props: SubResourceListProps;
    let wrapper;

    beforeEach(() => {
        props = {
            subResourceTitle: 'Test',
            subResources: [{
                subResourceId: '1',
                name: 'Test',
                showName: true,
            }],
            visibleSubResourceCount: 1,
        };
        wrapper = shallow(<SubResourceList {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with more pill', () => {
        wrapper.setProps({
            subResources: [
                {
                    subResourceId: '1',
                    name: 'Test 1',
                    showName: true,
                },
                {
                    subResourceId: '2',
                    name: 'Test 2',
                    showName: true,
                },
            ],
        });
        expect(wrapper.find(SubResourceItem)).toHaveLength(1);
        expect(wrapper.find(MorePill).exists()).toBe(true);
    });
});
