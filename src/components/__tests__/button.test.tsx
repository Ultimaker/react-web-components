// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Button from '../button';
import Spinner from '../spinner';

// mocks
import { mockClickEvent } from '../../__mocks__/clickMock'

describe('The Button component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            onClickHandler: jest.fn(),
            id: 'testButton'
        };
        wrapper = shallow(<Button {...props}>Button text</Button>);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onClickHandler).not.toHaveBeenCalled();
    });

    it('calls onClickHandler when it is clicked', () => {
        wrapper.simulate('click', mockClickEvent);
        expect(props.onClickHandler).toHaveBeenCalled();
    });

    it('does not call onClickHandler when it is clicked and onClickHandler is not passed', () => {
        wrapper.setProps({ onClickHandler: null });
        wrapper.simulate('click', mockClickEvent);
        expect(props.onClickHandler).not.toHaveBeenCalled();
    });

    it('renders a button with type submit prop `type` is submit', () => {
        wrapper.setProps({ type: 'submit' });
        expect(wrapper.find('[type="submit"]')).toHaveLength(1);
    });

    it('renders a anchor when prop `type` is link and an external link is given', () => {
        wrapper.setProps({ type: 'link', linkURL: 'https://ultimaker.com/' });
        expect(wrapper).toMatchSnapshot();
    });

    it('renders a link when prop `type` is link and an internal link is given', () => {
        wrapper.setProps({ type: 'link', linkURL: '/print_jobs' });
        expect(wrapper).toMatchSnapshot();
    });

    it('is disabled when prop `disabled` is true', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('.disabled')).toHaveLength(1);
        expect(wrapper.find('[disabled]')).toHaveLength(1);
        wrapper.simulate('click', mockClickEvent);
        expect(props.onClickHandler).not.toHaveBeenCalled();
        wrapper.setProps({ type: 'link', linkURL: 'https://ultimaker.com/' });
        expect(wrapper.prop('href')).toBeUndefined();
    });

    it('renders a spinner and disables the button when prop `showSpinner` is true', () => {
        wrapper.setProps({ showSpinner: true });
        expect(wrapper.find(Spinner)).toHaveLength(1);
        expect(wrapper.find('.waiting')).toHaveLength(1);
        expect(wrapper.find('[disabled]')).toHaveLength(1);
        wrapper.setProps({ type: 'link', linkURL: 'https://ultimaker.com/' });
        expect(wrapper.find(Spinner)).toHaveLength(1);
        expect(wrapper.prop('href')).toBeUndefined();
    });

    it('applies the correct class when prop `style` is secondary', () => {
        wrapper.setProps({ style: 'secondary' });
        expect(wrapper.find('.btn--secondary')).toHaveLength(1);
        expect(wrapper.find('.btn--primary').exists()).toEqual(false);
    });

    it('applies the correct class when prop `style` is quiet', () => {
        wrapper.setProps({ style: 'quiet' });
        expect(wrapper.find('.btn--quiet')).toHaveLength(1);
        expect(wrapper.find('.btn--primary').exists()).toEqual(false);
    });

    it('applies the correct class when prop `style` is alert', () => {
        wrapper.setProps({ style: 'alert' });
        expect(wrapper.find('.btn--alert')).toHaveLength(1);
        expect(wrapper.find('.btn--primary').exists()).toEqual(false);
    });

    it('applies the correct class when prop `shape` is circle', () => {
        wrapper.setProps({ shape: 'circle' });
        expect(wrapper.find('.btn--circle')).toHaveLength(1);
    });

    it('applies the correct class when prop `shape` is circle', () => {
        wrapper.setProps({ shape: 'pill' });
        expect(wrapper.find('.btn--pill')).toHaveLength(1);
    });

    it('can open a link in a new tab', () => {
        wrapper.setProps({ type: 'link', linkURL: 'https://ultimaker.com/', linkToNewTab: true });
        expect(wrapper.prop('target')).toEqual('_blank');
    });

    it('applies an additional class name when passed', () => {
        wrapper.setProps({ className: 'additionalClass' });
        expect(wrapper.find('.additionalClass')).toHaveLength(1);
    });
})
