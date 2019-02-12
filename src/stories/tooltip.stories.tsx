import * as React from 'react';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import {
    withKnobs, text, boolean, selectV2,
} from '@storybook/addon-knobs/react';
import styles from '@sambego/storybook-styles';
import { withInfo } from '@storybook/addon-info';
/* eslint-enable */

// components
import Tooltip from '../components/tooltip';
import InfoTooltip from '../components/info_tooltip';

const stories = storiesOf('Tooltips', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

const directionOptions = {
    north: 'north',
    south: 'south',
};
const spacingDefaultValue = 'north';

stories.add('Tooltip', withInfo(
    'Basic on hover tooltip',
)(() => (
    <Tooltip
        tooltipText={text('Text', 'Tooltip body text')}
        direction={selectV2('Direction', directionOptions, spacingDefaultValue)}
        disableTooltip={boolean('Disable tooltip', false)}
    >
        {text('Label', 'Tooltip trigger text')}
    </Tooltip>
)));

stories.add('Info tooltip', withInfo(
    'Tooltip with an info icon as the trigger',
)(() => (
    <InfoTooltip
        infoText={text('Text', 'Tooltip body text')}
        direction={selectV2('Direction', directionOptions, spacingDefaultValue)}
        disableTooltip={boolean('Disable tooltip', false)}
    />
)));
