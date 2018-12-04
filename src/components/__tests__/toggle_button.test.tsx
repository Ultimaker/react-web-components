// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ToggleButton from '../toggle_button';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


describe('The Checkbox component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testToggleButton',
            value: false,
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<ToggleButton {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should not propagate click', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });
});
