// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import DropDownMenuItem from '../drop_down_menu_item';

describe('The DropDownMenuItem component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      active: false,
      onClickHandler: jest.fn(),
    };
    wrapper = shallow(<DropDownMenuItem {...props}>Menu item</DropDownMenuItem>);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onClickHandler).not.toHaveBeenCalled();
  });

});
