import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

import InputField from '../components/input_field';
import { ImageFile } from '../components/image_upload';
import { Tile } from '../components/tile';

const stories = storiesOf('Forms', module);

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
            <div style={{ width: 250 }}>
                <InputField
                    value={store.state.value}
                    type="text"
                    id="id_1"
                    label={text('Label', 'Input field')}
                    onChangeHandler={(id, value) => store.set({ value })}
                    placeholder={text('Placeholder text', 'Placeholder text')}
                    focusOnLoad
                    validationError={text('Validation error message', 'Validation Error')} />
            </div>
        )
    )
);

stories.add('Number field', withState({ value: 1 })
    (withInfo('Number input field')
        (({ store }) =>
            <div style={{ width: 250 }}>
                <InputField
                    value={store.state.value}
                    type="number"
                    id="id_2"
                    min={1}
                    max={100}
                    onChangeHandler={(id, value) => store.set({ value })}
                    focusOnLoad
                    validationError={text('Validation error message', 'Validation Error')} />
            </div>
        )
    )
);

stories.add('Text area', withState({ value: null })
    (withInfo('Textarea input field')
        (({ store }) =>
            <div style={{ width: 250 }}>
                <InputField
                    type="textarea"
                    id="id_3"
                    value={store.state.value}
                    focusOnLoad
                    onChangeHandler={(id, value) => store.set({ value })}
                    placeholder="Textarea"
                    textareaAutoGrow={boolean('Auto grow', true)} />
            </div>
        )
    )
);

stories.add('Password field', withState({ value: null })
    (withInfo('Password input field')
        (({ store }) =>
            <div style={{ width: 250 }}>
                <InputField
                    type="password"
                    id="id_4"
                    value={store.state.value}
                    label={text('Label', 'Enter your password')}
                    onChangeHandler={(id, value) => store.set({ value })}
                    focusOnLoad
                    validationError={text('Validation error message', 'Validation Error')} />
            </div>
        )
    )
);

stories.add('Email field', withState({ value: null })
    (withInfo('Email input field')
        (({ store }) =>
            <div style={{ width: 250 }}>
                <InputField type="email"
                    id="id_5"
                    value={store.state.value}
                    label={text('Label', 'Enter your email address')}
                    onChangeHandler={(id, value) => store.set({ value })}
                    focusOnLoad
                    validationError={text('Validation error message', 'Validation Error')} />
            </div>
        )
    )
);

stories.add('Checkbox', withState({ value: null })
    (withInfo('Checkbox input field')
        (({ store }) =>
            <InputField type="checkbox"
                id="id_6"
                value={store.state.value}
                onChangeHandler={(id, value) => store.set({ value })}
                staticField={boolean('Disabled', false)} />
        )
    )
);

stories.add('Select field', withState({ value: null })
    (withInfo('Select input field')
        (({ store }) =>
            <div style={{ width: 250 }}>
                <InputField type="select"
                    id="id_7"
                    value={store.state.value}
                    label={text('Label', 'Select an option')}
                    onChangeHandler={(id, value) => { console.log('value', value); store.set({ value }) }}
                    validationError={text('Validation error message', 'Validation Error')}
                    selectOptions={[
                        { label: 'Option 1', value: 1 },
                        { label: 'Option 2', value: 2, disabled: true },
                        { label: 'Option 3', value: 3 }
                    ]} />
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
            <div style={{ width: 250 }}>
                <InputField type="image"
                    id="id_8"
                    value={store.state.value}
                    onChangeHandler={(id, value: ImageFile) => store.set({ value: value.preview })}
                    imageShape={selectV2('Image shape', options, defaultValue)}
                    placeholder={text('Placeholder Label', 'Upload an image')} />
            </div>
        )
    )
);

stories.add('Date picker', withState({ value: '10-10-2018' })
    (withInfo('Date selection field')
        (({ store }) =>
            <div style={{ width: 250 }}>
                <InputField type="date"
                    id="id_9"
                    value={store.state.value}
                    onChangeHandler={(id, value) => store.set({ value })} />
            </div>
        )
    )
);

stories.add('Tags selector', withState({ value: ['Manchester', 'Utrecht'] })
    (withInfo('Tags input field with suggestions')
        (({ store }) =>
            <Tile>
                <div style={{ width: 350 }}>
                    <InputField type="tags"
                        id="id_10"
                        value={store.state.value}
                        onChangeHandler={(id, value) => store.set({ value })}
                        placeholder="Tags"
                        tagSuggestions={['Chester', 'London', 'Amsterdam', 'Amersfoort', 'Manchester', 'Utrecht']} />
                </div>
            </Tile>
        )
    )
);

stories.add('Upload file field', withState({ value: null })
    (withInfo('Upload file field')
        (({ store }) =>
            <div style={{ width: 350 }}>
                <InputField type="file"
                    id="id_11"
                    label={text('Label', 'Upload file')}
                    value={store.state.value}
                    onChangeHandler={(id, value) => store.set({ value })}
                    placeholder={text('Placeholder text', 'Placeholder text')}
                    focusOnLoad
                    validationError={text('Validation error message', 'Validation Error')} />
            </div>
        )
    )
);
