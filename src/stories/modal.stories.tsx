import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Modal from '../components/modal';
import Popup from '../components/popup';
import AboutDialog from '../components/about_dialog';

const stories = storiesOf('Modal', module);

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));

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