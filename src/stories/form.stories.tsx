import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { State, Store } from '@sambego/storybook-state';

import InputField from '../components/input_field';
import Checkbox from '../components/checkbox';

const stories = storiesOf('Forms', module);

const store = new Store({
    checked: false,
});

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Text field', () =>
    <div>
        <InputField type="text"
            onChangeHandler={action('changed')}
            placeholder="Text field"
            focusOnLoad
            validationError={boolean('Validation Error', false)} />
    </div>
);

stories.add('Number field', () =>
    <div>
        <InputField type="number"
            min={1}
            max={100}
            onChangeHandler={action('changed')}
            focusOnLoad
            validationError={boolean('Validation Error', false)} />
    </div>
);

stories.add('Text area', () =>
    <div>
        <InputField type="textarea"
            onChangeHandler={action('changed')}
            placeholder="Textarea" />
    </div>
);

stories.add('Checkbox', () =>
    <State store={store}>
        <Checkbox id="checkbox"
            checked={false}
            onChangeHandler={() => store.set({ checked: !store.get('checked') })}
            disabled={boolean('Disabled', false)} />
    </State>
);