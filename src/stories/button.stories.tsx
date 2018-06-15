import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import Button from '../components/button'

const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);

stories.add('Primary', () => 
    <Button onClickHandler={action('clicked')} showSpinner={boolean('Loading', false)} style="primary">
        {text('Label', 'Hello Storybook')}
    </Button>
);
