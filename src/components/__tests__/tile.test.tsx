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
});
