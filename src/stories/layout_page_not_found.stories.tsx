import * as React from 'react';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
/* eslint-enable */

// components
import PageNotFound from '../views/page_not_found';

const stories = storiesOf('Example layouts', module);

stories.addDecorator(withKnobs);

stories.add('Page Not Found', withInfo(
    'A page to be displayed when the intended page cannot be.',
)(() => (
    <PageNotFound
        location={window.location}
        titleText="Page Not Found"
        messageText="The page requested could not be found"
    />
)));
