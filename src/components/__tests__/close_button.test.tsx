// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import CloseButton from '../close_button';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock';


describe('The CloseButton component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            onClickHandler: jest.fn(),
        };
        wrapper = shallow(<CloseButton {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onClickHandler).not.toHaveBeenCalled();
    });

    it('should call onClickHandler when clicked', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(props.onClickHandler).toHaveBeenCalled();
    });

    it('should not propagate click when clicked', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(mockClickEvent.stopPropagation).toBeCalled();
    });

});
