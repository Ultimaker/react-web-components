import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../components/button'

storiesOf('Button', module)
  .add('Simple', () => <Button onClickHandler={action('clicked')}>Hello Button</Button>)
  .add('Loading', () => <Button onClickHandler={action('clicked')} style="primary" showSpinner>Hello Button</Button>)
  .add('Primary', () => <Button onClickHandler={action('clicked')} style="primary">Hello Button</Button>);
