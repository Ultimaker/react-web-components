// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SelectList from '../select_list';

describe('The SelectList component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            options: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2, disabled: true },
                { label: 'Option 3', value: 3 },
            ],
            value: 1,
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<SelectList {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should show menu when the label is clicked', () => {
        wrapper.find('.label').props().onClickHandler();
        expect(wrapper.find('.visible')).toHaveLength(1);
    });

    it('should not render a label when value is null', () => {
        wrapper.setProps({ value: null });
        expect(wrapper.find('.label__text').text()).toBe('');
    });
});
