// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SelectListItem from '../select_list_item';

describe('The SelectListItem component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      active: false,
      value: 1,
      label: 'List item',
      onChangeHandler: jest.fn(),
    };
    wrapper = shallow(<SelectListItem {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onChangeHandler).not.toHaveBeenCalled();
  });

});
