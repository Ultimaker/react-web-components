// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import CloseButton from '../close_button';

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

});
