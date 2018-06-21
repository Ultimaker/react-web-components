import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Modal from '../components/modal';
import Popup from '../components/popup';

const stories = storiesOf('Modal', module);

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));

const directionOptions = {
  north: 'north',
  south: 'south',
};
const spacingDefaultValue = 'north';

stories.add('Modal', withInfo(
  'Basic Modal'
)(() =>
  <Modal isOpen={boolean('isOpen', true)} onOverlayClickHandler={action('clicked')}>
    <div style={{ background: 'white', height: 200, width: 300 }} />
  </Modal>
));

stories.add('Confirm popup', withInfo(
  'Popup modal for confirmation'
)(() =>
  <Popup
    isOpen={boolean('isOpen', true)}
    type="confirm"
    headerText="Confirm popup"
    bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    primaryBtnText="Confirm"
    primaryBtnHandler={action('clicked')}
    primaryBtnStyle="primary"
    secondaryBtnText="Cancel"
    secondaryBtnHandler={action('clicked')}
    secondaryBtnStyle="quiet" />
));

stories.add('Prompt popup', withInfo(
  'Popup modal for user input'
)(() =>
  <Popup
    isOpen={boolean('isOpen', true)}
    type="prompt"
    headerText="Prompt popup"
    bodyText="Input a number:"
    primaryBtnText="Confirm"
    primaryBtnHandler={action('clicked')}
    primaryBtnStyle="primary"
    secondaryBtnText="Cancel"
    secondaryBtnHandler={action('clicked')}
    secondaryBtnStyle="quiet"
    inputType="number"
    inputDefaultValue={10}
    inputMin={1}
    inputMax={100} />
));