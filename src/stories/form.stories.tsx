import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { State, Store } from '@sambego/storybook-state';
import { withInfo } from '@storybook/addon-info';

import InputField from '../components/input_field';
import Checkbox from '../components/checkbox';

const stories = storiesOf('Forms', module);

const store = new Store({
  checked: false,
});

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));

stories.add('Text field', withInfo(
  'Text input field'
)(() =>
  <div style={{ width: 250 }}>
    <InputField type="text"
      id="id_1"
      label={text('Label', 'Input field')}
      onChangeHandler={action('changed')}
      placeholder={text('Placeholder text', 'Placeholder text')}
      focusOnLoad
      validationError={boolean('Validation error', false)}
      validationErrorMsg={text('Validation error message', 'Validation Error')} />
  </div>
));

stories.add('Number field', withInfo(
  'Number input field'
)(() =>
  <div style={{ width: 250 }}>
    <InputField type="number"
      id="id_2"
      min={1}
      max={100}
      defaultValue={10}
      onChangeHandler={action('changed')}
      focusOnLoad
      validationError={boolean('Validation error', false)}
      validationErrorMsg={text('Validation error message', 'Validation Error')} />
  </div>
));

stories.add('Text area', withInfo(
  'Text area field'
)(() =>
  <div style={{ width: 250 }}>
    <InputField type="textarea"
      id="id_3"
      onChangeHandler={action('changed')}
      placeholder="Textarea" />
  </div>
));

stories.add('Password field', withInfo(
  'Password input field'
)(() =>
  <div style={{ width: 250 }}>
    <InputField type="password"
      id="id_4"
      label={text('Label', 'Enter your password')}
      onChangeHandler={action('changed')}
      focusOnLoad
      validationError={boolean('Validation error', false)}
      validationErrorMsg={text('Validation error message', 'Validation Error')} />
  </div>
));

stories.add('Email field', withInfo(
  'Email input field'
)(() =>
  <div style={{ width: 250 }}>
    <InputField type="email"
      id="id_5"
      label={text('Label', 'Enter your email address')}
      onChangeHandler={action('changed')}
      focusOnLoad
      validationError={boolean('Validation error', false)}
      validationErrorMsg={text('Validation error message', 'Validation Error')} />
  </div>
));

stories.add('Checkbox', withInfo({
  propTablesExclude: [State],
  text: 'Checkbox input field'
})(() =>
  <State store={store}>
    <Checkbox id="id_6"
      onChangeHandler={() => store.set({ checked: !store.get('checked') })}
      disabled={boolean('Disabled', false)} />
  </State>
));

stories.add('Select field', withInfo(
  'Select input field'
)(() =>
  <div style={{ width: 250 }}>
    <InputField type="select"
      id="id_7"
      label={text('Label', 'Select an option')}
      onChangeHandler={action('changed')}
      validationError={boolean('Validation error', false)}
      validationErrorMsg={text('Validation error message', 'Validation Error')}
      selectActiveOption="Option 1"
      selectOptions={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']} />
  </div>
));