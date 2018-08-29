// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Modal from '../modal';

describe('The Modal component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onOverlayClickHandler: jest.fn(),
    };
    wrapper = shallow(<Modal {...props} />);
  });

  it('should render a TransitionMotion', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onOverlayClickHandler).not.toHaveBeenCalled();
  });

  it('should render', () => {
    expect(wrapper.render()).toMatchSnapshot();
    expect(props.onOverlayClickHandler).not.toHaveBeenCalled();
  });

});
