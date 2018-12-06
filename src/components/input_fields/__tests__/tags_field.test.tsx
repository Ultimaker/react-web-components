// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import TagsField, { TagsFieldProps } from '../tags_field';
import InputFieldWrapper from '../input_field_wrapper';
import TagsSelector from '../../tags_selector';

describe('The tags field component', () => {
    let props: TagsFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            value: ['tag1', 'tag2'],
            placeholder: 'placeholder text',
            tagSuggestions: ['tag3', 'tag4'],
        };
        wrapper = shallow(<TagsField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a tags selector', () => {
        expect(wrapper.find(TagsSelector).props()).toEqual({
            id: props.id,
            onChangeHandler: wrapper.instance()._onChange,
            value: props.value,
            placeholder: props.placeholder,
            suggestions: props.tagSuggestions,
            error: undefined,
            autofocus: false,
            disabled: false,
        });
    });

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(TagsSelector).prop('onChangeHandler')(['tag5']);
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, ['tag5']);
    });
});
