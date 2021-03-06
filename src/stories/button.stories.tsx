import * as React from 'react';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import styles from '@sambego/storybook-styles';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';
import { BrowserRouter } from 'react-router-dom';
/* eslint-enable */

// components
import Button from '../components/button';
import ToggleButton from '../components/toggle_button';
import CloseButton from '../components/close_button';
import InfoLink from '../components/info_link';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Rectangle', withInfo(
    'Default button shape.',
)(() => (
    <div>
        <div className="layout">
            <div className="layout__item u-fit">
                <Button
                    onClickHandler={action('clicked')}
                    showSpinner={boolean('Loading', false)}
                    disabled={boolean('Disabled', false)}
                    appearance="primary"
                >
                    {text('Text 1', 'Primary')}
                </Button>
            </div>
            <div className="layout__item u-fit">
                <Button
                    onClickHandler={action('clicked')}
                    showSpinner={boolean('Loading', false)}
                    disabled={boolean('Disabled', false)}
                    appearance="secondary"
                >
                    {text('Text 2', 'Secondary')}
                </Button>
            </div>
            <div className="layout__item u-fit">
                <Button
                    onClickHandler={action('clicked')}
                    showSpinner={boolean('Loading', false)}
                    disabled={boolean('Disabled', false)}
                    appearance="quiet"
                >
                    {text('Text 3', 'Quiet')}
                </Button>
            </div>
            <div className="layout__item u-fit">
                <Button
                    onClickHandler={action('clicked')}
                    showSpinner={boolean('Loading', false)}
                    disabled={boolean('Disabled', false)}
                    appearance="alert"
                >
                    {text('Text 4', 'Alert')}
                </Button>
            </div>
        </div>
        <div className="layout layout--align-center" style={{ marginTop: '2.4rem' }}>
            <div className="layout__item u-fit">
                <Button
                    onClickHandler={action('clicked')}
                    showSpinner={boolean('Loading', false)}
                    disabled={boolean('Disabled', false)}
                    appearance="link"
                >
                    {text('Text 5', 'Link')}
                </Button>
            </div>
            <div className="layout__item u-fit">
                <Button
                    onClickHandler={action('clicked')}
                    showSpinner={boolean('Loading', false)}
                    disabled={boolean('Disabled', false)}
                    appearance="no-style"
                >
                    {text('Text 6', 'No style')}
                </Button>
            </div>
        </div>
    </div>
)));

stories.add('Circle', withInfo(
    'Round button shape. Can be used for action buttons on mobile.',
)(() => (
    <div className="layout">
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="primary"
                shape="circle"
            >
                {text('Text 1', 'P')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="secondary"
                shape="circle"
            >
                {text('Text 2', 'S')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="quiet"
                shape="circle"
            >
                {text('Text 3', 'Q')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="alert"
                shape="circle"
            >
                {text('Text 4', 'A')}
            </Button>
        </div>
    </div>
)));

stories.add('Pill', withInfo(
    'Long rounded button shape. Can be used for filter buttons.',
)(() => (
    <div className="layout">
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="primary"
                shape="pill"
            >
                {text('Text 1', 'Primary')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="secondary"
                shape="pill"
            >
                {text('Text 2', 'Secondary')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="quiet"
                shape="pill"
            >
                {text('Text 3', 'Quiet')}
            </Button>
        </div>
        <div className="layout__item u-fit">
            <Button
                onClickHandler={action('clicked')}
                showSpinner={boolean('Loading', false)}
                disabled={boolean('Disabled', false)}
                appearance="alert"
                shape="pill"
            >
                {text('Text 3', 'Alert')}
            </Button>
        </div>
    </div>
)));

stories.add('Toggle', withState({ value: null })(withInfo(
    'Toggle switch button based on a checkbox. Can be used for turning on/off settings.',
)(({ store }) => (
    <ToggleButton
        id="toggle"
        value={store.state.value}
        onChangeHandler={() => store.set({ value: !store.state.value })}
        disabled={boolean('Disabled', false)}
    />
))));

stories.add('Close', withInfo(
    'Close button. Can be used for closing a container/panel.',
)(() => (
    <CloseButton onClickHandler={action('clicked')} />
)));

stories.add('Link button', withInfo(
    'An anchor styled as a button. Useful for page navigation',
)(() => (
    <BrowserRouter>
        <Button
            type="link"
            linkURL={text('Link URL', 'https://ultimaker.com/')}
            linkToNewTab={boolean('Link to new tab', false)}
            showSpinner={boolean('Loading', false)}
            disabled={boolean('Disabled', false)}
            appearance="primary"
        >
            {text('Text 1', 'Link')}
        </Button>
    </BrowserRouter>
)));

stories.add('Info link', withInfo(
    'An info link to open an external page',
)(() => (
    <InfoLink infoLinkURL={text('URL', 'https://ultimaker.com/')} />
)));
