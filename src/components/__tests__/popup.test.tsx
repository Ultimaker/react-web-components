// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Popup from '../popup';

describe('The Popup component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      headerText: 'Popup header',
      bodyText: 'Popup body',
      primaryBtnText: 'Primary button',
      primaryBtnHandler: jest.fn(),
    };
    wrapper = shallow(<Popup {...props} />);
  });

  it('should render a confirm popup', () => {
    wrapper.setProps({ type: 'confirm' });
    expect(wrapper).toMatchSnapshot();
    expect(props.primaryBtnHandler).not.toHaveBeenCalled();
  });

  it('should render a prompt popup', () => {
    wrapper.setProps({ type: 'prompt' });
    expect(wrapper).toMatchSnapshot();
    expect(props.primaryBtnHandler).not.toHaveBeenCalled();
  });
});
