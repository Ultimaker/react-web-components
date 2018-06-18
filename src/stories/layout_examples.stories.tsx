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

const stories = storiesOf('Layout examples', module);

stories.addDecorator(withKnobs);

stories.add('Sign in page', withInfo(
    'A example layout for a sign in page'
)(() =>
    <Page title="Sign In" maxWidth={600}>
        <ListGroup align="center">
            <ListGroupRow>
                <Content padding="md">
                    <p>In order to process, you must login with your Ultimaker account</p>
                    <Button onClickHandler={action('clicked')}>Continue</Button>
                </Content>
            </ListGroupRow>
        </ListGroup>
    </Page>
));