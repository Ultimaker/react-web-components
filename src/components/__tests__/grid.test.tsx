// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Grid from '../grid';

describe('The Grid component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      label: 'Empty grid'
    };
    wrapper = shallow(<Grid {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
