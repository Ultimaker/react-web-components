import * as React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styles from '@sambego/storybook-styles';
/* eslint-enable import/no-extraneous-dependencies */

import { SearchBar } from '../components/search_bar';

const stories = storiesOf('Search Bar', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        padding: '2em',
    }));

stories.add('SearchBar', () => (
    <SearchBar
        onChange={action('query')}
        emitDelay={500}
        placeholder="Search for…"
    />
));
