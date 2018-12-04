// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import RangeSlider from '../range_slider';

describe('The Range Slider component', () => {
    it('should render', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<RangeSlider onChange={onChange} value={0.5} />);
        expect(wrapper).toMatchSnapshot();
        expect(onChange).not.toHaveBeenCalled();
    });

    it('should parse the callback', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<RangeSlider onChange={onChange} value={0.5} />);
        const inputChanged = wrapper.find('input').prop('onChange') as any;
        inputChanged({ target: { value: '0.9' } });
        expect(onChange).toHaveBeenCalledWith(0.9);
    });
});
