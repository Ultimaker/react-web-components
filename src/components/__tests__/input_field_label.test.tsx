// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputFieldLabel from '../input_field_label';

describe('The InputFieldLabel component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      id: 'testInputField',
      type: 'text',
      label: 'Input label',
      labelLayoutWidth: '1/1',
      labelWidthBreakpoint: 'sm'
    };
    wrapper = shallow(<InputFieldLabel {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
