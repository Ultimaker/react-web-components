// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import PageTitle from '../page_title';

describe('The PageTitle component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      label: 'Page title'
    };
    wrapper = shallow(<PageTitle {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
