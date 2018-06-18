import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { State, Store } from '@sambego/storybook-state';
import { withInfo } from '@storybook/addon-info';

import { Button, ButtonProps } from '../components/button';
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

stories.add('Rectangle', withInfo(
    'Default button shape with three available styles.'
)(() =>
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
)
);

stories.add('Circle', withInfo(
    'Round button shape with three available styles. Can be used for action buttons on mobile.'
)(() =>
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
));

stories.add('Pill', withInfo(
    'Long rounded button shape with three available styles. Can be used for filter buttons.'
)(() =>
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
));

stories.add('Toggle', withInfo({
    propTablesExclude: [ State ],
    text: 'Toggle switch button based on a checkbox. Can be used for turning on/off settings.'
})(() =>
    <State store={store}>
        <ToggleButton id="toggle"
            checked={false}
            onChangeHandler={() => store.set({ checked: !store.get('checked') })}
            disabled={boolean('Disabled', false)} />
    </State>
));

stories.add('Close', withInfo(
    'Close button. Can be used for closing a container/panel.'
)(() =>
    <CloseButton onClickHandler={action('clicked')} />
));