import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import Page from '../components/page';
import ListGroup from '../components/list_group';
import Button from '../components/button';
import Tile from '../components/tile';

const stories = storiesOf('Example layouts', module);

stories.addDecorator(withKnobs);

stories.add('Sign In', withInfo(
    'A example layout for a sign in page'
)(() =>
    <Page title="Sign In" maxWidth={600}>
        <ListGroup align="center">
            <Tile padding="lg" align="center">
                <p>In order to continue, you must sign in with your Ultimaker account.</p>
                <Button onClickHandler={action('clicked')}>Sign In</Button>
            </Tile>
        </ListGroup>
    </Page>
));
