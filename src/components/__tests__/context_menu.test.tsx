// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ContextMenu from '../context_menu';

describe('The ContextMenu component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      menuWidth: 200
    };
    wrapper = shallow(<ContextMenu {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
