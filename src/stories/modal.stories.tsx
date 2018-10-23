import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2 } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

import Modal from '../components/modal';
import Popup from '../components/popup';
import AboutDialog from '../components/about_dialog';
import { PopupPrompt } from '../components/popup_prompt';

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
    'Basic Modal'
)(() =>
    <Modal onOverlayClickHandler={action('clicked')}>
        <div style={{ background: 'white', height: 200, width: 300 }} />
    </Modal>
));

stories.add('Confirm popup', withInfo(
    'Popup modal for confirmation'
)(() =>
    <Popup
        headerText="Confirm popup"
        bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        primaryBtnText="Confirm"
        primaryBtnHandler={action('clicked')}
        primaryBtnStyle="primary"
        secondaryBtnText="Cancel"
        secondaryBtnHandler={action('clicked')}
        secondaryBtnStyle="quiet"
        width={selectV2('Popup width', widthOptions, widthDefaultValue)} />
));

stories.add('Prompt popup', withInfo(
    'Popup modal for user input'
)(() =>
    <PopupPrompt
        headerText="Prompt popup"
        bodyText="Input a number:"
        primaryBtnText="Confirm"
        primaryBtnHandler={action('clicked')}
        primaryBtnStyle="primary"
        secondaryBtnText="Cancel"
        secondaryBtnHandler={action('clicked')}
        secondaryBtnStyle="quiet"
        inputDefaultValue={10}
        validationHandler={validation}
        inputType="number"
        inputMin={1}
        inputMax={100} />
));

function validation(quantity: string | number): string {
    const quantityInt = Number(quantity);

    if (!quantityInt) {
        return 'Please enter a number';
    }
    return null;
}

stories.add('Multi-step popup', withState({ step: 1 })
    (withInfo('Multi-step popup modal')
        (({ store }) =>
            <Popup
                headerText={'Multi-step popup ' + store.state.step}
                bodyText={getBodyText(store.state.step)}
                primaryBtnText={getPrimaryBtnText(store.state.step)}
                primaryBtnHandler={() => store.set({ step: validateStep(store.state.step + 1, 3) })}
                primaryBtnStyle="primary"
                secondaryBtnText={getSecondaryBtnText(store.state.step)}
                secondaryBtnHandler={() => store.set({ step: validateStep(store.state.step - 1, 3) })}
                secondaryBtnStyle="quiet"
                step={store.state.step}
                totalSteps={3}
                width={selectV2('Popup width', widthOptions, widthDefaultValue)} />
        )
    )
);

function getBodyText(step: number): string {
    switch (step) {
        case 1:
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        case 2:
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        case 3:
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur lectus lorem, id consectetur tellus sollicitudin eu. Curabitur nec metus nibh. Sed sagittis mi nisi, sollicitudin viverra magna malesuada nec. Morbi porttitor, nunc nec mollis feugiat, ex felis commodo sapien, vitae porta sapien magna sit amet nibh. Fusce quis porttitor massa. Pellentesque ornare risus at elementum tempor. Sed convallis odio tellus. Aenean tincidunt purus ut nisl ultrices, sit amet auctor odio porta. Mauris euismod ligula luctus semper dictum. Nulla orci leo, facilisis ac dapibus vitae, consequat ut sem.'
    }
}

function getPrimaryBtnText(step: number): string {
    switch (step) {
        case 1: case 2:
            return 'Next'
        case 3:
            return 'Confirm'
    }
}

function getSecondaryBtnText(step: number): string {
    switch (step) {
        case 1:
            return 'Cancel'
        case 2: case 3:
            return 'Back'
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

stories.add('About dialog', withInfo(
    'About dialog modal for providing information about the application'
)(() =>
    <AboutDialog
        appName="Test app"
        versionNumber="1.0.0"
        closeHandler={action('clicked')}
        supportLinkURL={'https://ultimaker.com/'}
        supportLinkText="Support page"
        componentsList={[
            { name: "array.prototype.includes", license: "MIT", url: "https://github.com/Steditor/es7-array.prototype.includes" },
            { name: "classnames", license: "MIT", url: "https://github.com/JedWatson/classnames" },
            { name: "gettext-extractor", license: "MIT", url: "https://github.com/lukasgeiter/gettext-extractor" },
            { name: "gettext-parser", license: "MIT", url: "https://github.com/smhg/gettext-parser" },
            { name: "lodash", license: "MIT", url: "https://lodash.com/" },
            { name: "moment", license: "MIT", url: "http://momentjs.com/" },
            { name: "node-gettext", license: "MIT", url: "https://github.com/alexanderwallin/node-gettext" },
            { name: "react", license: "MIT", url: "https://reactjs.org/" },
            { name: "react-collapse", license: "MIT", url: "https://github.com/nkbt/react-collapse" },
            { name: "react-dom", license: "MIT", url: "https://reactjs.org/" },
            { name: "react-motion", license: "MIT", url: "https://github.com/chenglou/react-motion" },
            { name: "react-refetch", license: "MIT", url: "https://github.com/heroku/react-refetch" },
            { name: "react-router-dom", license: "MIT", url: "https://github.com/ReactTraining/react-router" }
        ]} />
));
