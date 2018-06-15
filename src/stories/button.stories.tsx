import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../components/button'

storiesOf('Button', module)
  .add('Simple', () => <Button onClickHandler={action('clicked')}>Hello Button</Button>)
  .add('Primary', () => <Button onClickHandler={action('clicked')} additionalClasses="btn--primary">Hello Button</Button>);
