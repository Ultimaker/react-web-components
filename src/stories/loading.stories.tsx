import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Loading from '../components/loading';
import LoadingPage from '../components/loading_page';
import Spinner from '../components/spinner';

const stories = storiesOf('Loading', module);

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));

stories.add('Loading text', withInfo(
  'Loading text component'
)(() =>
  <Loading label={text('Label', 'Loading')} />
));

stories.add('Loading page', withInfo(
  'Full page loading spinner. To be used when the application is loading.'
)(() =>
  <LoadingPage />
));