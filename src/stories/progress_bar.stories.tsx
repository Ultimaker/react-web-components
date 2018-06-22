import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import ProgressBar from '../components/progress_bar';

const stories = storiesOf('Progress bar', module);

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));

stories.add('Progress bar', withInfo(
  'Progress bar component'
)(() =>
  <div style={{ width: 200 }} >
    <ProgressBar progressPercentage={number('Percentage', 33)}
      isStopped={boolean('isStopped', false)}
      barHeight={number('Bar height', 5)} />
  </div>
));