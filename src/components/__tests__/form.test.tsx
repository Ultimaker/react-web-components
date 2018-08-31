// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Form from '../form';

describe('The Form component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      onSubmitHandler: jest.fn(),
    };
    wrapper = shallow(<Form {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onSubmitHandler).not.toHaveBeenCalled();
  });

});
