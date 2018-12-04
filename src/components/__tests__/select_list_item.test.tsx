// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SelectListItem from '../select_list_item';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


describe('The SelectListItem component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            active: false,
            value: 1,
            label: 'List item',
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<SelectListItem {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should call the click handler when item is clicked', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(props.onChangeHandler).toHaveBeenCalled();
    });

    it('should not call the click handler when item is disabled', () => {
        wrapper.setProps({ disabled: true });
        wrapper.simulate('click', mockClickEvent);
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });

    it('should render item as disabled', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);
    });
});
