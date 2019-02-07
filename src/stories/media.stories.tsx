import * as React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import styles from '@sambego/storybook-styles';
import { withInfo } from '@storybook/addon-info';
/* eslint-enable */

// components
import VideoPlayer from '../components/video_player';

const stories = storiesOf('Media', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Video player', withInfo(
    'A Video player',
)(() => (
    <VideoPlayer
        width={text('Width', '')}
        height={text('Height', '')}
        url={text('url', 'https://www.youtube.com/watch?v=160yAufQ-is')}
    />
)));
