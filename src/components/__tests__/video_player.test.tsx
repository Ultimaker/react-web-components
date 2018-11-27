// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import VideoPlayer, { VideoPlayerProps } from '../video_player';

describe('The video player component', () => {
    let wrapper;
    let props: VideoPlayerProps = {
        url: 'https://www.youtube.com/watch?v=160yAufQ-is'
    }

    beforeEach(() => {
        wrapper = shallow(<VideoPlayer {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should display the error state', () => {
        wrapper.setState({ error: true })
        expect(wrapper).toMatchSnapshot();
    });

    it('should display a message in case the player can not play the url', () => {
        wrapper.setState({ wrongUrl: true })
        expect(wrapper).toMatchSnapshot();
    });

});
