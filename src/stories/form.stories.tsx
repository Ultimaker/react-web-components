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
  <div>
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
  <div>
    <InputField type="number"
      id="id_2"
      min={1}
      max={100}
      defaultValue={10}
      onChangeHandler={action('changed')}
      focusOnLoad
      validationError={boolean('Validation Error', false)}
      validationErrorMsg={text('Validation error message', 'Validation Error')} />
  </div>
));

stories.add('Text area', withInfo(
  'Text area field'
)(() =>
  <div>
    <InputField type="textarea"
      id="id_3"
      onChangeHandler={action('changed')}
      placeholder="Textarea" />
  </div>
));

stories.add('Checkbox', withInfo({
  propTablesExclude: [State],
  text: 'Checkbox input field'
})(() =>
  <State store={store}>
    <Checkbox id="id_4"
      checked={false}
      onChangeHandler={() => store.set({ checked: !store.get('checked') })}
      disabled={boolean('Disabled', false)} />
  </State>
));