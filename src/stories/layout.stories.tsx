import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Tile from '../components/tile';
import Grid from '../components/grid';
import GridItem from '../components/grid_item';

const stories = storiesOf('Layout', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px'
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

const gutterOptions = {
    tiny: 'tiny',
    small: 'small',
    medium: 'medium',
    large: 'large',
    without: 'without'
};
const gutterDefaultValue = 'medium';

const widthFractionOptions = {
    '1/1': '1/1',
    '1/2': '1/2',
    '1/3': '1/3',
    '1/4': '1/4',
    '1/5': '1/5'
};
const widthFractionDefaultValue = '1/3';

const breakpointOptions = {
    'xs': 'xs',
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg'
};
const breakpointDefaultValue = 'sm';

stories.add('Tile', withInfo(
    'A content tile that can be used as full width or as part of a grid'
)(() =>
    <Tile disabled={boolean('Disabled', false)}
        selected={boolean('Selected', false)}
        padding={selectV2('Padding', paddingOptions, paddingDefaultValue)}
        align={selectV2('Align', alignOptions, alignDefaultValue)}
    >
        <div>Tile</div>
        <div style={{ marginTop: '2.4rem' }}>Component</div>
    </ Tile>
));

stories.add('Grid', withInfo(
    'A basic grid layout component'
)(() =>
    <div style={{ width: '80vw' }}>
        <Grid align={selectV2('Align', alignOptions, alignDefaultValue)}
            gutter={selectV2('Gutter', gutterOptions, gutterDefaultValue)}
            title={text('Grid title', 'Grid title')}
        >
            <GridItem widthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }}></div>
            </GridItem>
            <GridItem widthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }}></div>
            </GridItem>
            <GridItem widthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }}></div>
            </GridItem>
            <GridItem widthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }}></div>
            </GridItem>
            <GridItem widthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }}></div>
            </GridItem>
            <GridItem widthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }}></div>
            </GridItem>
        </ Grid>
    </div>
));