// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import InfoTooltip from '../info_tooltip';

describe('The InfoTooltip component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            infoText: 'Tooltip text',
        };
        wrapper = shallow(<InfoTooltip {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
