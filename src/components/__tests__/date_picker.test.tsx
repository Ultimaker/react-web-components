// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DatePicker from '../date_picker';

import moment = require('moment');

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

    it('should display an error state', () => {
        wrapper.setProps({ error: true });
        expect(wrapper.find('.error')).toHaveLength(1);
    });
});
