import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

// components
import InputField from '../components/input_field';
import { ImageFile } from '../components/image_upload';
import { Tile } from '../components/tile';
import TextField from '../components/input_fields/text_field';
import NumberField from '../components/input_fields/number_field';
import CheckboxField from '../components/input_fields/checkbox_field';
import SelectField from '../components/input_fields/select_field';
import ImageUploadField from '../components/input_fields/image_upload_field';
import DateField from '../components/input_fields/date_field';
import Form from '../components/form';

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


stories.add('Form', withState({ imageValue: null, textValue: null, numberValue: 1, selectValue: 1, checkboxValue: null, dateValue: null, customValue: null })
    (withInfo('A example layout for a form')
        (({ store }) =>
            <div style={{ maxWidth: 550, margin: '2.4rem auto' }}>
                <Tile padding="lg">
                    <Form primaryBtnText="Submit"
                        onSubmitHandler={action('submit')}
                        secondaryBtnText="Cancel"
                        secondaryBtnHandler={action('clicked')}
                        secondaryBtnStyle="quiet"
                        validationErrors={{
                            id_1: 'Validation error 1',
                            id_2: 'Validation error 2',
                            id_3: 'Validation error 3',
                            id_4: 'Validation error 4',
                            id_5: 'Validation error 5',
                            id_6: 'Validation error 6'
                        }}
                    >

                        <ImageUploadField
                            id="id_0"
                            imageSize="18rem"
                            imageShape="round"
                            value={store.state.imageValue}
                            labelLayoutWidth='fit'
                            centerInputField
                            onChangeHandler={(id, value: ImageFile) => store.set({ imageValue: value.preview })}
                            onReadHandler={action('read')} />

                        <TextField
                            id="id_1"
                            value={store.state.textValue}
                            label={text('Label 1', 'Text input field')}
                            labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                            labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                            onChangeHandler={(id, value) => store.set({ textValue: value })}
                            placeholder={text('Placeholder text', 'Placeholder text')}
                            infoText={text('Info text', 'Description of the input field')}
                            focusOnLoad
                            required
                            infoLinkURL="http://www.ultimaker.com" />

                        <NumberField
                            id="id_2"
                            value={store.state.numberValue}
                            label={text('Label 2', 'Number input field')}
                            labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                            labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                            min={1}
                            max={100}
                            onChangeHandler={(id, value) => store.set({ numberValue: value })}
                            required />

                        <SelectField
                            id="id_3"
                            value={store.state.selectValue}
                            label={text('Label 3', 'Select input field')}
                            labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                            labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                            onChangeHandler={(id, value) => store.set({ selectValue: value })}
                            selectOptions={[{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2, disabled: true }, { label: 'Option 3', value: 3 }]}
                            required />

                        <CheckboxField
                            id="id_4"
                            value={store.state.checkboxValue}
                            label={text('Label 4', 'Checkbox input field')}
                            labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                            labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                            onChangeHandler={(id, value) => store.set({ checkboxValue: value })}
                            required />

                        <DateField
                            id="id_5"
                            value={store.state.dateValue}
                            label={text('Label 5', 'Date input field')}
                            labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                            labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                            onChangeHandler={(id, value) => store.set({ dateValue: value })}
                            required />

                        <div>
                            <a href="#link">Links</a>  or other elements may also be used.
                        </div>

                        <InputField
                            value={null}
                            type="children"
                            id="id_6"
                            label={text('Label', 'Custom input field')}
                            labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                            labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                            onChangeHandler={() => { }}
                            submitted={typeof store.state.value === 'string'}
                        >
                            <input
                                onChange={(e) => store.set({ customValue: e.target.value })}
                                value={store.state.customValue}
                            />
                        </InputField>
                    </Form>

                </Tile>
            </div>
        )
    )
);
