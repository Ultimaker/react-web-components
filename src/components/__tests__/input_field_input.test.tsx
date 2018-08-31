// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputFieldInput from '../input_field_input';

describe('The InputFieldInput component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      id: 'testInputField',
      value: 'Test input',
      onChangeHandler: jest.fn(),
      type: 'text',
      showValidationError: false,
      labelLayoutWidth: '1/1',
      labelWidthBreakpoint: 'sm'
    };
    wrapper = shallow(<InputFieldInput {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onChangeHandler).not.toHaveBeenCalled();
  });

});
