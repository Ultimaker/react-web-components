import * as React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import styles from '@sambego/storybook-styles';
import { withInfo } from '@storybook/addon-info';
/* eslint-enable */

// components
import Loading from '../components/loading';
import LoadingPage from '../components/loading_page';

const stories = storiesOf('Loading', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Loading text', withInfo(
    'Loading text component',
)(() => <Loading label={text('Label', 'Loading')} />));

stories.add('Loading page', withInfo(
    'Full page loading spinner. To be used when the application is loading.',
)(() => {
    // pass the timeout as key so that it gets remounted when it changes.
    const timeout = number('Timeout to show spinner', 500);
    return <LoadingPage timeoutMs={timeout} key={timeout} />;
}));
