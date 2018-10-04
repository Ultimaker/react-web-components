// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SelectField, {SelectFieldProps} from '../select_field';
import SelectList from '../../select_list';
import InputFieldWrapper from '../input_field_wrapper';

describe('The select field component', () => {
    let props: SelectFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            onChangeHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            value: 3,
            selectOptions: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2, disabled: true },
                { label: 'Option 3', value: 3 }
            ]
        };
        wrapper = shallow(<SelectField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a select picker', () => {
        expect(wrapper.find(SelectList).props()).toEqual({
            id: props.id,
            onChangeHandler: wrapper.instance()._onChange,
            value: props.value,
            options: props.selectOptions,
            error: undefined,
      });
    })

    it('should not pass invalid values', () => {
        wrapper.setProps({value: {}, submitted: true, validationError: "Invalid value"})
        expect(wrapper.find(SelectList).prop("value")).toBeNull();
        expect(wrapper.find(SelectList).prop("error")).toEqual(true);
    })

    it('should render a static value', () => {
        wrapper.setProps({staticField: true})
        expect(wrapper.find(SelectList)).toHaveLength(0)
        expect(wrapper.find(InputFieldWrapper).prop("children")).toEqual("Option 3");
        wrapper.setProps({value: 10})
        expect(wrapper.find(InputFieldWrapper).prop("children")).toBeUndefined();
    })

    it('should call the callback', () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        wrapper.find(SelectList).prop("onChangeHandler")(2);
        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, 2);
    });
});
