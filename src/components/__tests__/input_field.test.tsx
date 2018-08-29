// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InputField from '../input_field';

describe('The InputField component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      id: 'testInputField',
      value: 'Test input',
      onChangeHandler: jest.fn(),
    };
    wrapper = shallow(<InputField {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onChangeHandler).not.toHaveBeenCalled();
  });

});
