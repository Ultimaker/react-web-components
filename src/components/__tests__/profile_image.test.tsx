// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ProfileImage from '../profile_image';

describe('The ProfileImage component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      width: '20px'
    };
    wrapper = shallow(<ProfileImage {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
