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
import Divider from '../components/divider';

const stories = storiesOf('Example layouts', module);

const widthFractionOptions = {
  '1/1': '1/1',
  '1/2': '1/2',
  '1/3': '1/3',
  '1/4': '1/4',
  '1/5': '1/5',
  'fill': 'fill',
  'fit': 'fit'
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
    minHeight: '100vh'
  }));

stories.add('Form', withInfo(
  'A example layout for a form'
)(() =>
  <div style={{ maxWidth: 600 }}>
    <Tile padding="lg">
      <Form primaryBtnText="Submit"
        onSubmitHandler={action('submit')}
        secondaryBtnText="Cancel"
        secondaryBtnHandler={action('clicked')}
        secondaryBtnStyle="quiet"
        formValidation={{
          success: boolean('Validation Success', true),
          validationErrors: { id_1: 'Validation error', id_2: 'Validation error', id_3: 'Validation error', id_4: 'Validation error', id_5: 'Validation error' }
        }}
      >
        <InputField type="text"
          id="id_1"
          label={text('Label 1', 'Text input field')}
          labelLayoutWidth={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          onChangeHandler={action('changed')}
          placeholder={text('Placeholder text', 'Placeholder text')}
          focusOnLoad />

        <InputField type="number"
          id="id_2"
          label={text('Label 2', 'Number input field')}
          labelLayoutWidth={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          min={1}
          max={100}
          defaultValue={10}
          onChangeHandler={action('changed')} />

        <InputField type="select"
          id="id_3"
          label={text('Label 3', 'Select input field')}
          labelLayoutWidth={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          onChangeHandler={action('changed')}
          selectActiveOption="Option 1"
          selectOptions={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']} />

        <InputField type="textarea"
          id="id_4"
          label={text('Label 4', 'Textarea input field')}
          labelLayoutWidth={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          onChangeHandler={action('changed')}
          placeholder="Textarea" />

        <Divider />

        <InputField type="checkbox"
          id="id_5"
          label={text('Label 5', 'Checkbox input field')}
          labelLayoutWidth={selectV2('Width fraction', widthFractionOptions, widthFractionDefaultValue)}
          labelWidthBreakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
          onChangeHandler={action('changed')}
          defaultValue={true} />

      </Form>
    </Tile>
  </div>
));
