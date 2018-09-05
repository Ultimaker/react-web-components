// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DatePicker from '../date_picker';

describe('The DatePicker component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testDatePicker',
            value: false,
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<DatePicker {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

});
