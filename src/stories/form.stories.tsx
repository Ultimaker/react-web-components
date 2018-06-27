import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import InputField from '../components/input_field';
import Checkbox from '../components/checkbox';
import ImageUpload from '../components/image_upload';
import DatePicker from '../components/date_picker';

const stories = storiesOf('Forms', module);

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

stories.add('Checkbox', withInfo(
  'Checkbox input field'
)(() =>
  <Checkbox id="id_6"
    onChangeHandler={action('changed')}
    disabled={boolean('Disabled', false)} />
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

const options = {
  Round: 'round',
  Square: 'square',
};
const defaultValue = 'round';

stories.add('Image upload', withInfo(
  'Image drag and drop or click to upload'
)(() =>
  <ImageUpload shape={selectV2('Image shape', options, defaultValue)} onFileSelection={action('changed')} />
));

stories.add('Date Picker', withInfo(
  'Select input field'
)(() =>
  <div style={{ width: 250 }}>
    <DatePicker
      id="id_8"
      onChangeHandler={action('changed')} />
  </div>
));