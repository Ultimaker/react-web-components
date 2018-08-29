// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ContextMenuItem from '../context_menu_item';

describe('The ContextMenuItem component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      label: 'Menu item',
      onClickHandler: jest.fn(),
    };
    wrapper = shallow(<ContextMenuItem {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onClickHandler).not.toHaveBeenCalled();
  });

});
