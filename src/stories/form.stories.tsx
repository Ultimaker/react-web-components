import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';

// components
import InputField from '../components/input_field';
import { ImageFile } from '../components/image_upload';
import { Tile } from '../components/tile';
import FileUploadField from '../components/input_fields/file_upload_field';
import TextField from '../components/input_fields/text_field';
import NumberField from '../components/input_fields/number_field';
import TextareaField from '../components/input_fields/textarea_field';
import CheckboxField from '../components/input_fields/checkbox_field';
import SelectField from '../components/input_fields/select_field';
import ImageUploadField from '../components/input_fields/image_upload_field';
import DateField from '../components/input_fields/date_field';
import TagsField from '../components/input_fields/tags_field';

const stories = storiesOf('Forms', module);

const widthFractionOptions = {
    '1/1': '1/1',
    '1/2': '1/2',
    '1/3': '1/3',
    '1/4': '1/4',
    '1/5': '1/5',
    'fill': 'fill',
    'fit': 'fit'
};
const widthFractionDefaultValue = '1/1';

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
        height: '100vh',
    }));

stories.add('Text field', withState({ value: null })
    (withInfo('Text input field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <TextField
                    value={store.state.value}
                    type="text"
                    id="id_1"
                    onChangeHandler={(id, value) => store.set({ value })}
                    label={text('Label', 'Input field')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    placeholder={text('Placeholder', 'Text')}
                    validationError={text('Validation error message', 'Validation Error')}
                    focusOnLoad={boolean('Focus on load', true)}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

stories.add('Number field', withState({ value: 1 })
    (withInfo('Number input field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <NumberField
                    value={store.state.value}
                    id="id_2"
                    min={1}
                    max={100}
                    onChangeHandler={(id, value) => store.set({ value })}
                    label={text('Label', 'Number field label')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    placeholder={text('Placeholder', 'Number')}
                    validationError={text('Validation error message', 'Validation Error')}
                    focusOnLoad={boolean('Focus on load', true)}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

stories.add('Text area', withState({ value: null })
    (withInfo('Textarea input field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <TextareaField
                    id="id_3"
                    value={store.state.value}
                    onChangeHandler={(id, value) => store.set({ value })}
                    label={text('Label', 'Textarea label')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    placeholder={text('Placeholder', 'Textarea')}
                    validationError={text('Validation error message', 'Validation Error')}
                    textareaAutoGrow={boolean('Auto grow', true)}
                    focusOnLoad={boolean('Focus on load', true)}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

stories.add('Password field', withState({ value: null })
    (withInfo('Password input field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <TextField
                    type="password"
                    id="id_4"
                    value={store.state.value}
                    onChangeHandler={(id, value) => store.set({ value })}
                    label={text('Label', 'Enter your password')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    placeholder={text('Placeholder', 'Password')}
                    validationError={text('Validation error message', 'Validation Error')}
                    focusOnLoad={boolean('Focus on load', true)}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

stories.add('Email field', withState({ value: null })
    (withInfo('Email input field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <TextField
                    type="email"
                    id="id_5"
                    value={store.state.value}
                    onChangeHandler={(id, value) => store.set({ value })}
                    label={text('Label', 'Enter your email address')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    placeholder={text('Placeholder', 'Email')}
                    validationError={text('Validation error message', 'Validation Error')}
                    focusOnLoad={boolean('Focus on load', true)}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

stories.add('Checkbox', withState({ value: null })
    (withInfo('Checkbox input field')
        (({ store }) =>
            <CheckboxField
                id="id_6"
                value={store.state.value}
                onChangeHandler={(id, value) => store.set({ value })}
                label={text('Label', 'Checkbox label')}
                labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                validationError={text('Validation error message', 'Validation Error')}
                staticField={boolean('Static field', false)}
                required={boolean('Required', false)}
                infoLinkURL={text('Info link URL', '')}
                infoText={text('Info text', '')}
                preLabelElement={text('Pre label element', '')}
            />
        )
    )
);

stories.add('Select field', withState({ value: null })
    (withInfo('Select input field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <SelectField
                    id="id_7"
                    value={store.state.value}
                    onChangeHandler={(id, value) => { store.set({ value }) }}
                    selectOptions={[
                        { label: 'Option 1', value: 1 },
                        { label: 'Option 2', value: 2, disabled: true },
                        { label: 'Option 3', value: 3 }
                    ]}
                    label={text('Label', 'Select an option')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    validationError={text('Validation error message', 'Validation Error')}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

const options = {
    Round: 'round',
    Square: 'square',
};
const defaultValue = 'round';

stories.add('Image upload', withState({ value: null })
    (withInfo('Image drag and drop or click to upload')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <ImageUploadField
                    id="id_8"
                    value={store.state.value}
                    onChangeHandler={(id, value: ImageFile) => store.set({ value: value.preview })}
                    onReadHandler={action('read')}
                    label={text('Label', 'Select an image')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    imageShape={selectV2('Image shape', options, defaultValue)}
                    imageSize={text('Image size', '18rem')}
                    placeholder={text('Placeholder Label', 'Upload an image')}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

stories.add('Date picker', withState({ value: '10-10-2018' })
    (withInfo('Date selection field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <DateField
                    id="id_9"
                    value={store.state.value}
                    onChangeHandler={(id, value) => store.set({ value })}
                    label={text('Label', 'Select a date')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    staticField={boolean('Static field', false)}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                />
            </div>
        )
    )
);

stories.add('Tags selector', withState({ value: ['Manchester', 'Utrecht'] })
    (withInfo('Tags input field with suggestions')
        (({ store }) =>
            <Tile>
                <div style={{ width: 350 }}>
                    <TagsField
                        id="id_10"
                        value={store.state.value}
                        onChangeHandler={(id, value) => store.set({ value })}
                        placeholder="Tags"
                        tagSuggestions={['Chester', 'London', 'Amsterdam', 'Amersfoort', 'Manchester', 'Utrecht']}
                        label={text('Label', 'Enter tags')}
                        labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                        labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                        staticField={boolean('Static field', false)}
                        required={boolean('Required', false)}
                        infoLinkURL={text('Info link URL', '')}
                        infoText={text('Info text', '')}
                        preLabelElement={text('Pre label element', '')}
                    />
                </div>
            </Tile>
        )
    )
);

stories.add('Upload file field', withState({ value: null })
    (withInfo('Upload file field')
        (() =>
            <div style={{ width: 350 }}>
                <FileUploadField
                    id="id_11"
                    label={text('Label', 'Upload file')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    uploading={boolean("Uploading", false)}
                    placeholder={text('Placeholder text', 'Placeholder text')}
                    validationError={text('Validation error message', 'Validation Error')}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                    accept={text('Accept file types', '.pdf,.zip').split(",")}
                />
            </div>
        )
    )
);

stories.add('Custom input field', withState({ value: null })
    (withInfo('Custom input field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <InputField
                    value={null}
                    type="children"
                    id="id_12"
                    onChangeHandler={() => { }}
                    label={text('Label', 'Custom input')}
                    labelLayoutWidth={selectV2('Label Layout Width', widthFractionOptions, widthFractionDefaultValue)}
                    labelWidthBreakpoint={selectV2('Label Layout Breakpoint', breakpointOptions, breakpointDefaultValue)}
                    validationError={text('Validation error message', 'Validation Error')}
                    submitted={typeof store.state.value === 'string'}
                    required={boolean('Required', false)}
                    infoLinkURL={text('Info link URL', '')}
                    infoText={text('Info text', '')}
                    preLabelElement={text('Pre label element', '')}
                >
                    <input
                        onChange={(e) => store.set({ value: e.target.value })}
                        value={store.state.value || ""}
                    />
                </InputField>
            </div>
        )
    )
);
