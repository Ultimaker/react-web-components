// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Checkbox from '../checkbox';

describe('The Checkbox component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      id: 'testCheckbox',
      value: false,
      onChangeHandler: jest.fn(),
    };
    wrapper = shallow(<Checkbox {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onChangeHandler).not.toHaveBeenCalled();
  });

});
