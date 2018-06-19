import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Tile from '../components/tile';
const stories = storiesOf('Layout', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

const paddingOptions = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    none: 'none',
};
const paddingDefaultValue = 'lg';

const alignOptions = {
    left: 'left',
    right: 'right',
    center: 'center'
};
const alignDefaultValue = 'center';

stories.add('Tile', withInfo(
    'A content tile that can be used as full width or as part of a grid'
)(() =>
    <Tile disabled={boolean('Disabled', false)}
        selected={boolean('Selected', false)}
        padding={selectV2('Padding', paddingOptions, paddingDefaultValue)}
        align={selectV2('Align', alignOptions, alignDefaultValue)}
    >
        <div>Tile</div>
        <div style={{marginTop: '2.4rem'}}>Component</div>
    </ Tile>
));
