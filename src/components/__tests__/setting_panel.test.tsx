// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import SettingPanel from '../setting_panel';
import SlideOutContainer from '../slide_out_container';
import ToggleButton from '../toggle_button';

describe('The SettingPanel component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            toggleId: 'id',
            settingValue: false,
            onChangeHandler: jest.fn(),
            headerText: 'header text',
            trueValueText: 'true value text',
            falseValueText: 'false value text',
            explanationText: 'a brief explanation'
        };
        wrapper = shallow(<SettingPanel {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should show the explanation text when the header is clicked', () => {
        expect(wrapper.state('showExplanation')).toBe(false);
        wrapper.find(SlideOutContainer).props().onHeaderClick();
        expect(wrapper.state('showExplanation')).toBe(true);
    });

    it('should show the explanation text when the header is clicked', () => {
        wrapper.find(ToggleButton).props().onChangeHandler();
        expect(props.onChangeHandler).toHaveBeenCalled();
    });

    it('should change the value text when the setting value changes', () => {
        expect(wrapper.find('.setting-panel__value-text').text()).toBe('false value text');
        wrapper.setProps({ settingValue: true });
        expect(wrapper.find('.setting-panel__value-text').text()).toBe('true value text');
    });
});
