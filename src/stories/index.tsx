import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClickHandler={action('clicked')}>Hello Button</Button>
  ));