import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import styles from "@sambego/storybook-styles";

// components
import Form from '../components/form';
import InputField from '../components/input_field';
import Tile from '../components/tile';

const stories = storiesOf('Example layouts', module);

const widthFractionOptions = {
  '1/1': '1/1',
  '1/2': '1/2',
  '1/3': '1/3',
  '1/4': '1/4',
  '1/5': '1/5'
};
const widthFractionDefaultValue = '1/3';

const breakpointOptions = {
  'xs': 'xs',
  'sm': 'sm',
  'md': 'md',
  'lg': 'lg'
};
const breakpointDefaultValue = 'sm';

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }));

stories.add('Form', withInfo(
  'A example layout for a form'
)(() =>
  <div>
    <Tile padding="lg">
      <Form>
        <InputField type="text"
          id="id_1"
          label={text('Label 1', 'Text input field')}
          labelWidthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          onChangeHandler={action('changed')}
          placeholder={text('Placeholder text', 'Placeholder text')}
          focusOnLoad
          validationError={boolean('Validation error', false)}
          validationErrorMsg={text('Validation error message', 'Validation Error')} />

        <InputField type="number"
          id="id_2"
          label={text('Label 2', 'Number input field')}
          labelWidthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          min={1}
          max={100}
          defaultValue={10}
          onChangeHandler={action('changed')}
          validationError={boolean('Validation error', false)}
          validationErrorMsg={text('Validation error message', 'Validation Error')} />

        <InputField type="select"
          id="id_3"
          label={text('Label 3', 'Select input field')}
          labelWidthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          onChangeHandler={action('changed')}
          validationError={boolean('Validation error', false)}
          validationErrorMsg={text('Validation error message', 'Validation Error')}
          selectActiveOption="Option 1"
          selectOptions={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']} />

        <InputField type="textarea"
          id="id_4"
          label={text('Label 4', 'Textarea input field')}
          labelWidthFraction={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          onChangeHandler={action('changed')}
          placeholder="Textarea"
          validationError={boolean('Validation error', false)}
          validationErrorMsg={text('Validation error message', 'Validation Error')} />
      </Form>
    </Tile>
  </div>
));
