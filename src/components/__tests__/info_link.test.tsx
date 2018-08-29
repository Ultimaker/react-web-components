// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InfoLink from '../info_link';

describe('The InfoLink component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      infoLinkURL: 'https://ultimaker.com/'
    };
    wrapper = shallow(<InfoLink {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
