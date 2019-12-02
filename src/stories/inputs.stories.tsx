import * as React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import {
    withKnobs, boolean, select, text,
} from '@storybook/addon-knobs';
import styles from '@sambego/storybook-styles';
/* eslint-enable import/no-extraneous-dependencies */

import * as Input from '../components/input';

const stories = storiesOf('Input elements', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        padding: '2em',
    }));

stories.add('InputText', () => (
    <Input.Text
        placeholder={text('placeholder', 'enter some text')}
        disabled={boolean('disabled', false)}
        hasError={boolean('hasError', false)}
        type={select('type', {
            text: 'text',
            password: 'password',
            email: 'email',
            url: 'url',
            number: 'number',
        })}
    />
));
