// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DropDownMenu from '../drop_down_menu';

describe('The DropDownMenu component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      activeLabel: 'Active label'
    };
    wrapper = shallow(<DropDownMenu {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
