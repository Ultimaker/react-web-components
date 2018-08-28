// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

// component
import Button from '../button';
import Spinner from '../spinner';

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

  it('should render', () => {
    expect(wrapper).toBeDefined();
    expect(props.onClickHandler).not.toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onClickHandler when it is clicked', () => {
    wrapper.simulate('click', mockClickEvent);
    expect(props.onClickHandler).toHaveBeenCalled();
  });

  it('renders a button with type submit prop `type` is submit', () => {
    wrapper.setProps({ type: 'submit' });
    expect(wrapper.find('[type="submit"]')).toHaveLength(1);
  });

  it('renders a anchor when prop `type` is link', () => {
    wrapper.setProps({ type: 'link' });
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('is disabled when prop `disabled` is true', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('.disabled')).toHaveLength(1);
    expect(wrapper.find('[disabled]')).toHaveLength(1);
  });

  it('renders a spinner and disables the button when prop `showSpinner` is true', () => {
    wrapper.setProps({ showSpinner: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
    expect(wrapper.find('.waiting')).toHaveLength(1);
    expect(wrapper.find('[disabled]')).toHaveLength(1);
  });

  it('applies the correct class when prop `style` is secondary', () => {
    wrapper.setProps({ style: 'secondary' });
    expect(wrapper.find('.btn--secondary')).toHaveLength(1);
  });

  it('applies the correct class when prop `style` is quiet', () => {
    wrapper.setProps({ style: 'quiet' });
    expect(wrapper.find('.btn--quiet')).toHaveLength(1);
  });

  it('applies the correct class when prop `style` is alert', () => {
    wrapper.setProps({ style: 'alert' });
    expect(wrapper.find('.btn--alert')).toHaveLength(1);
  });

  it('applies the correct class when prop `shape` is circle', () => {
    wrapper.setProps({ shape: 'circle' });
    expect(wrapper.find('.btn--circle')).toHaveLength(1);
  });

  it('applies the correct class when prop `shape` is circle', () => {
    wrapper.setProps({ shape: 'pill' });
    expect(wrapper.find('.btn--pill')).toHaveLength(1);
  });
})
