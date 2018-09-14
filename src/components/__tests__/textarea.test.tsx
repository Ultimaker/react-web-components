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
    });

    it('should render with auto grow', () => {
        wrapper.setProps({ autoGrow: 'true' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should display an error state', () => {
        wrapper.setProps({ error: 'true' });
        expect(wrapper.find('.error')).toHaveLength(1);
    });

    it('should display an error state with auto grow', () => {
        wrapper.setProps({ error: 'true', autoGrow: 'true' });
        expect(wrapper.find('.error')).toHaveLength(1);
    });

    it('should handle an textarea input change', () => {
        wrapper.find('textarea').simulate('change', { target: { value: 'update' } });
        expect(props.onChangeHandler).toHaveBeenCalledWith('update');
    });

});
