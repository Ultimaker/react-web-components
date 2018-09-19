import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";

import Tile from '../components/tile';
import Grid from '../components/grid';
import GridItem from '../components/grid_item';

const stories = storiesOf('Colors', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
        marginBottom: '50px'
    }));

stories.add('Colors', withInfo(
    'All colors'
)(() =>
    <div>

        <div style={{ 'margin': '0 0 1.2rem 0' }}>Colors</div>

        <Tile padding="lg">
            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-blue"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#00a7e9</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-blue
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-blue-light"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#24bcf3</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-blue-light
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-blue-lighter"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#46C4F2</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-blue-lighter
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-red"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#ef5b5b</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-red
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-green"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#23aa1d</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-green
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-orange"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#fbb045</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-orange
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-black"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#000000</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-black
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-grey-darker"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#666666</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-grey-darker
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-grey-dark"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#999999</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-grey-dark
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-grey-mid"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#b7b7b7</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-grey-mid
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-grey-light"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#dcdcdc</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-grey-light
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-grey-lighter"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#e6e6e6</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-grey-lighter
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-grey-lightest"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#f3f3f3</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-grey-lightest
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-white"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">#ffffff</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-white
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-grey-lightest"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0.0075)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-grey-lightest
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-grey-lighter"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0.03)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-grey-lighter
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-grey-light"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0.06)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-grey-light
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-grey-mid"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0.09)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-grey-mid
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-grey-dark"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0.16)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-grey-dark
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-grey-darker"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0.25)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-grey-darker
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-grey-darkest"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 0, 0, 0.85)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-grey-darkest
                </GridItem>
            </Grid>

            <Grid position="middle">
                <GridItem layoutWidth="fit">
                    <div className="color-square color-transparent-blue"></div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    <div className="color-label">rgba(0, 167, 233, 0.06)</div>
                </GridItem>
                <GridItem layoutWidth="fit">
                    $color-transparent-blue
                </GridItem>
            </Grid>
        </Tile>


    </div>
));
