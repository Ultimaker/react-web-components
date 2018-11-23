import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Tile from '../components/tile';
import ProgressBar from '../components/progress_bar';
import PanelArrow from '../components/panel_arrow';
import Divider from '../components/divider';
import Pill from '../components/pill';
import CircleIcon from '../components/circle_icon';
import KeepAspectRatio from '../components/keep_aspect_ratio';

const stories = storiesOf('Other', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Progress bar', withInfo(
    'Progress bar component'
)(() =>
    <div style={{ width: 200 }} >
        <ProgressBar progressPercentage={number('Percentage', 33)}
            isStopped={boolean('isStopped', false)}
            barHeight={text('Bar height', '0.6rem')} />
    </div>
));

stories.add('Panel Arrow', withInfo(
    'A flippable arrow used for displaying when something is open or not'
)(() =>
    <PanelArrow
        active={boolean('Active', false)}
        width={text('Width', '2.4rem')} />
));

const directionOptions = {
    'horizontal': 'horizontal',
    'vertical': 'vertical',
};
const directionValue = 'horizontal';

stories.add('Divider', withInfo(
    'A divider line. Useful for breaking up content'
)(() =>
    <div style={{ width: 200, height: 200 }} >
        <Divider direction={selectV2('Direction', directionOptions, directionValue)} />
    </div>
));

stories.add('Pill', withInfo(
    'A toggleable pill'
)(() =>
    <Tile padding="md">
        <Pill active={boolean('Active', false)}>
            {text('Text', 'Pill')}
        </Pill>
    </Tile>
));

const styleOptions = {
    'primary': 'primary',
    'secondary': 'secondary',
    'alert': 'alert'
};
const styleValue = 'primary';

stories.add('Circle Icon', withInfo(
    'A circle icon'
)(() =>
    <CircleIcon style={selectV2('Style', styleOptions, styleValue)} disabled={boolean('Disabled', false)} size={text('Size', '4rem')}>
        {text('Text', '1')}
    </CircleIcon>
));

stories.add('Keep aspect ratio', withInfo(
    'A container to keep a given aspect ratio for an image or iframe'
)(() =>
    <KeepAspectRatio content={<img className='pretty-picture' src='https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='A nice whatever'/>} >
    <img className='pretty-picture' src='https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='A nice whatever'/>
    </KeepAspectRatio>
));
