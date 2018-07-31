import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Tile from '../components/tile';
import ProgressBar from '../components/progress_bar';
import PanelArrow from '../components/panel_arrow';
import Divider from '../components/divider';
import Pill from '../components/pill';

const stories = storiesOf('Other', module);

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

stories.add('Panel Arrow', withInfo(
  'A flippable arrow used for displaying when something is open or not'
)(() =>
  <PanelArrow
    active={boolean('Active', false)}
    width={text('Width', '2.4rem')} />
));

const directionOptions = {
  'horizontal': 'horizontal',
  'vertical': 'vertical',
};
const directionValue = 'horizontal';

stories.add('Divider', withInfo(
  'A divider line. Useful for breaking up content'
)(() =>
  <div style={{ width: 200, height: 200 }} >
    <Divider direction={selectV2('Direction', directionOptions, directionValue)} />
  </div>
));

stories.add('Pill', withInfo(
  'A toggleable pill'
)(() =>
  <Tile padding="md">
    <Pill active={boolean('Active', false)}>
      {text('Text', 'Pill')}
    </Pill>
  </Tile>
));