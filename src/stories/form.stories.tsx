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
import TagsSelector from '../components/tags_selector';
import { Tile } from '../components/tile';

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
      focusOnLoad
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
      selectActiveOptionValue={1}
      selectOptions={[{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2, disabled: true }, { label: 'Option 3', value: 3 }]} />
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

stories.add('Date picker', withInfo(
  'Date selection field'
)(() =>
  <div style={{ width: 250 }}>
    <DatePicker
      id="id_8"
      onChangeHandler={action('changed')} />
  </div>
));

stories.add('Tags selector', withInfo(
  'Tags input field with suggestions'
)(() =>
  <Tile>
    <div style={{ width: 250 }}>
      <InputField type="tags"
        id="id_3"
        focusOnLoad
        onChangeHandler={action('changed')}
        placeholder="Tags"
        tagSuggestions={['Chester', 'London', 'Amsterdam', 'Amersfoort']} />
    </div>
  </Tile>
));