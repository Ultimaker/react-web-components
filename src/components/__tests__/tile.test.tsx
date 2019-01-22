// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import Tile from '../tile';

describe('The Tile component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Tile />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render disabled', () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find('.tile--disabled')).toHaveLength(1);
    });

    it('should render selected', () => {
        wrapper.setProps({ selected: true });
        expect(wrapper.find('.tile--selected')).toHaveLength(1);
    });

    it('should render alert', () => {
        wrapper.setProps({ alert: true });
        expect(wrapper.find('.tile--alert')).toHaveLength(1);
    });

    it('should render success', () => {
        wrapper.setProps({ success: true });
        expect(wrapper.find('.tile--success')).toHaveLength(1);
    });

    it('should render shadow', () => {
        wrapper.setProps({ appearance: 'shadow' });
        expect(wrapper.find('.tile--shadow')).toHaveLength(1);
    });

    it('should render dashed', () => {
        wrapper.setProps({ appearance: 'dashed' });
        expect(wrapper.find('.tile--dashed')).toHaveLength(1);
    });

    it('should render flat', () => {
        wrapper.setProps({ appearance: 'flat' });
        expect(wrapper.find('.tile--flat')).toHaveLength(1);
    });

    it('should render padding', () => {
        wrapper.setProps({ padding: 'lg' });
        expect(wrapper.find('.padding-lg')).toHaveLength(1);
    });

    it('should render radius', () => {
        wrapper.setProps({ radius: '0.5rem' });
        expect(wrapper.find('.tile').prop('style')).toHaveProperty('borderRadius', '0.5rem');
    });

    it('should render align', () => {
        wrapper.setProps({ align: 'center' });
        expect(wrapper.find('.tile').prop('style')).toHaveProperty('textAlign', 'center');
    });
});
