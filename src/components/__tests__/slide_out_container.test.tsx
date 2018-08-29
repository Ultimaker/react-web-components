// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SlideOutContainer from '../slide_out_container';

describe('The SlideOutContainer component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      isOpen: false,
      onChangeHandler: jest.fn(),
    };
    wrapper = shallow(<SlideOutContainer {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onChangeHandler).not.toHaveBeenCalled();
  });

});
