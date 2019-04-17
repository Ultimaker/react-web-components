// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { BetaPill, BetaPillProps } from '../beta_pill';

describe('The beta pill component', () => {
    let wrapper;
    let props: BetaPillProps;

    beforeEach(() => {
        props = {
            betaExplanationText: 'This feature is in beta and is visible because you are part of the closed beta program.',
        };
        wrapper = shallow(<BetaPill {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
