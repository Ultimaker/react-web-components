// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import Textarea from '../textarea';

describe('The Textarea component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testTextarea',
            value: '',
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<Textarea {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should display an error state', () => {
        wrapper.setProps({ error: 'true' });
        expect(wrapper.find('.error')).toHaveLength(1);
    });

});
