// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Pill from '../pill';

describe('The Pill component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Pill />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
