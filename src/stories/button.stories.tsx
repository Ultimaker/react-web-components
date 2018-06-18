import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { State, Store } from '@sambego/storybook-state';

import Button from '../components/button';
import ToggleButton from '../components/toggle_button';
import CloseButton from '../components/close_button';

const stories = storiesOf('Button', module);

const store = new Store({
    checked: false,
});

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }));

stories.add('Rectangle', () =>
    <div className="layout">
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="primary"
            >
                {text('Text 1', 'Primary button')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="secondary"
            >
                {text('Text 2', 'Secondary button')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="quiet"
            >
                {text('Text 3', 'Quiet button')}
            </Button>
        </div>
    </div>
);

stories.add('Circle', () =>
    <div className="layout">
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="primary"
                shape="circle"
            >
                {text('Text 1', 'P')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="secondary"
                shape="circle"
            >
                {text('Text 2', 'S')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="quiet"
                shape="circle"
            >
                {text('Text 3', 'Q')}
            </Button>
        </div>
    </div>
);

stories.add('Pill', () =>
    <div className="layout">
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="primary"
                shape="pill"
            >
                {text('Text 1', 'Primary button')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="secondary"
                shape="pill"
            >
                {text('Text 2', 'Secondary button')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                style="quiet"
                shape="pill"
            >
                {text('Text 3', 'Quiet button')}
            </Button>
        </div>
    </div>
);

stories.add('Toggle', () =>
    <State store={store}>
        <ToggleButton id="toggle"
            checked={false}
            onChangeHandler={() => store.set({ checked: !store.get('checked') })}
            disabled={boolean('Disabled', false)} />
    </State>
);

stories.add('Close', () =>
    <CloseButton onClickHandler={action('clicked')} />
);