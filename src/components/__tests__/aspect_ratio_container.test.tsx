// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import AspectRatioContainer from '../aspect_ratio_container';

describe('The Image component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            aspectRatio: 4 / 3,
            id: 'container-id',
            className: 'container-class',
        };
        wrapper = shallow(<AspectRatioContainer {...props}><img id="myPrettyPicture" className="test-image" src="http://ultimaker.com" alt="a test image" /></AspectRatioContainer>);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
