// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow, mount } from 'enzyme';

// component
import VideoPlayer, { VideoPlayerProps } from '../video_player';

describe('The video player component', () => {
    let wrapper;
    const props: VideoPlayerProps = {
        url: 'https://www.youtube.com/watch?v=160yAufQ-is',
    };

    beforeEach(() => {
        wrapper = shallow(<VideoPlayer {...props} />);
    });

    it('should render the loading state', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should display the error state', () => {
        wrapper.instance()._error();
        expect(wrapper).toMatchSnapshot();
    });

    it('should display the loaded state', () => {
        wrapper.instance()._ready();
        expect(wrapper).toMatchSnapshot();
    });

    it('should display the loading state when the url is updated with a valid url', () => {
        wrapper.instance()._ready();
        wrapper.setProps({ url: 'https://www.youtube.com/watch?v=KI5pvThvu9I' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should stay in the loaded state when the url is updated with the original url', () => {
        wrapper.instance()._ready();
        wrapper.setProps({ url: 'https://www.youtube.com/watch?v=160yAufQ-is' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should display a message in case the player can not play the url', () => {
        wrapper.setProps({ url: '|||invalid url |||' });
        expect(wrapper).toMatchSnapshot();
    });
});
