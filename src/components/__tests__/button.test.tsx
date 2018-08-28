// Copyright (c) 2018 Ultimaker B.V.
import 'jest'
import 'jsdom-global/register'
import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

// component
import Button from '../button'

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock'

describe('The button component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onClickHandler: jest.fn(),
    };
    wrapper = shallow(<Button {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('calls onClickHandler when it is clicked', () => {
    wrapper.simulate('click', mockClickEvent);
    expect(props.onClickHandler).toHaveBeenCalled();
  });
})
