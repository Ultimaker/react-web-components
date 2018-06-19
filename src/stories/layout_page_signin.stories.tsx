import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs  } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import Page from '../components/page';
import ListGroup from '../components/list_group';
import ListGroupRow from '../components/list_group_row';
import Button from '../components/button';
import Content from '../components/content';

const stories = storiesOf('Layouts', module);

stories.addDecorator(withKnobs);

stories.add('Sign In', withInfo(
    'A example layout for a sign in page'
)(() =>
    <Page title="Sign In" maxWidth={600}>
        <ListGroup align="center">
            <ListGroupRow>
                <Content padding="lg" align="center">
                    <p>In order to continue, you must sign in with your Ultimaker account.</p>
                    <Button onClickHandler={action('clicked')}>Sign In</Button>
                </Content>
            </ListGroupRow>
        </ListGroup>
    </Page>
));
