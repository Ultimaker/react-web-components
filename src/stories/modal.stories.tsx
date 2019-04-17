import * as React from 'react';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styles from '@sambego/storybook-styles';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
/* eslint-enable */

// components
import Modal from '../components/modal';
import Popup from '../components/popup';
import AboutDialog from '../components/about_dialog';
import { PopupPrompt } from '../components/popup_prompt';
import PopupBase from '../components/popup_base';

const stories = storiesOf('Modal', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

const widthOptions = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
};
const widthDefaultValue = 'sm';

stories.add('Modal', withInfo(
    'Basic Modal',
)(() => (
    <Modal onOverlayClickHandler={action('clicked')}>
        <div style={{ background: 'white', height: 200, width: 300 }} />
    </Modal>
)));

stories.add('Confirm popup', withInfo(
    'Popup modal for confirmation',
)(() => (
    <Popup
        headerText="Confirm popup"
        bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        primaryBtnText="Confirm"
        primaryBtnHandler={action('clicked')}
        primaryBtnAppearance="primary"
        secondaryBtnText="Cancel"
        secondaryBtnHandler={action('clicked')}
        secondaryBtnAppearance="quiet"
        width={select('Popup width', widthOptions, widthDefaultValue)}
        footer={text('Footer')}
    />
)));

stories.add('Basic popup', withInfo(
    'PopupBase modal',
)(() => (
    <PopupBase
        headerText="Basic popup"
        width={select('Popup width', widthOptions, widthDefaultValue)}
        footer={text('Footer')}
    >
        <div style={{ height: 200 }}>
            Content of the popup.
        </div>
    </PopupBase>
)));

function validation(quantity: string | number): string {
    const quantityInt = Number(quantity);

    if (!quantityInt) {
        return 'Please enter a number';
    }
    return null;
}

stories.add('Prompt popup', withInfo(
    'Popup modal for user input',
)(() => (
    <PopupPrompt
        headerText="Prompt popup"
        bodyText="Input a number:"
        primaryBtnText="Confirm"
        primaryBtnHandler={action('clicked')}
        primaryBtnAppearance="primary"
        secondaryBtnText="Cancel"
        secondaryBtnHandler={action('clicked')}
        secondaryBtnAppearance="quiet"
        inputDefaultValue={10}
        validationHandler={validation}
        inputType="number"
        inputMin={1}
        inputMax={100}
        footer={text('Footer')}
    />
)));

function getBodyText(step: number): string {
    switch (step) {
    case 1:
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    case 2:
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    case 3:
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus lorem, id consectetur tellus sollicitudin eu. Curabitur nec metus nibh. Sed sagittis mi nisi, sollicitudin viverra magna malesuada nec. Morbi porttitor, nunc nec mollis feugiat, ex felis commodo sapien, vitae porta sapien magna sit amet nibh. Fusce quis porttitor massa. Pellentesque ornare risus at elementum tempor. Sed convallis odio tellus. Aenean tincidunt purus ut nisl ultrices, sit amet auctor odio porta. Mauris euismod ligula luctus semper dictum. Nulla orci leo, facilisis ac dapibus vitae, consequat ut sem.';
    default:
        return null;
    }
}

function getPrimaryBtnText(step: number): string {
    switch (step) {
    case 1: case 2:
        return 'Next';
    case 3:
        return 'Confirm';
    default:
        return null;
    }
}

function getSecondaryBtnText(step: number): string {
    switch (step) {
    case 1:
        return 'Cancel';
    case 2: case 3:
        return 'Back';
    default:
        return null;
    }
}

function validateStep(step: number, totalSteps: number) {
    if (step < 1) {
        return 1;
    }
    if (step > totalSteps) {
        return totalSteps;
    }
    return step;
}

stories.add('Multi-step popup', withState({ step: 1 })(withInfo('Multi-step popup modal')(({ store }) => (
    <Popup
        headerText={`Multi-step popup ${store.state.step}`}
        bodyText={getBodyText(store.state.step)}
        primaryBtnText={getPrimaryBtnText(store.state.step)}
        primaryBtnHandler={() => store.set({ step: validateStep(store.state.step + 1, 3) })}
        primaryBtnAppearance="primary"
        secondaryBtnText={getSecondaryBtnText(store.state.step)}
        secondaryBtnHandler={() => store.set({ step: validateStep(store.state.step - 1, 3) })}
        secondaryBtnAppearance="quiet"
        step={store.state.step}
        totalSteps={3}
        width={select('Popup width', widthOptions, widthDefaultValue)}
        footer={text('Footer')}
    />
))));

stories.add('About dialog', withInfo(
    'About dialog modal for providing information about the application',
)(() => (
    <AboutDialog
        versionNumber="1.0.0"
        closeHandler={action('clicked')}
        headerText="About"
        packagesPreText="This app uses the following Open Source components:"
        licensePreText="license"
        versionPreText="Version: "
        componentsList={[
            { name: 'array.prototype.includes', license: 'MIT', url: 'https://github.com/Steditor/es7-array.prototype.includes' },
            { name: 'classnames', license: 'MIT', url: 'https://github.com/JedWatson/classnames' },
            { name: 'gettext-extractor', license: 'MIT', url: 'https://github.com/lukasgeiter/gettext-extractor' },
            { name: 'gettext-parser', license: 'MIT', url: 'https://github.com/smhg/gettext-parser' },
            { name: 'moment', license: 'MIT', url: 'http://momentjs.com/' },
            { name: 'node-gettext', license: 'MIT', url: 'https://github.com/alexanderwallin/node-gettext' },
            { name: 'react', license: 'MIT', url: 'https://reactjs.org/' },
            { name: 'react-dom', license: 'MIT', url: 'https://reactjs.org/' },
            { name: 'react-spring', license: 'MIT', url: 'https://www.react-spring.io/' },
            { name: 'react-refetch', license: 'MIT', url: 'https://github.com/heroku/react-refetch' },
            { name: 'react-router-dom', license: 'MIT', url: 'https://github.com/ReactTraining/react-router' },
        ]}
    />
)));
