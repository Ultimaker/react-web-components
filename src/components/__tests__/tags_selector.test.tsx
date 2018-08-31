// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import TagsSelector from '../tags_selector';

describe('The TagsSelector component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      value: ['tag 1', 'tag 2', 'tag 3'],
      onChangeHandler: jest.fn(),
    };
    wrapper = shallow(<TagsSelector {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(props.onChangeHandler).not.toHaveBeenCalled();
  });

});
