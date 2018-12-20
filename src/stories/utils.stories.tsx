import * as React from 'react';

// storybook
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import styles from '@sambego/storybook-styles';

// utils
import copyToClipboard from '../utils/copy_to_clipboard';
import downloadFile from '../utils/download_file';
import splitTextByNewLine from '../utils/split_text_by_new_line';

// inputs
import TextareaField from '../components/input_fields/textarea_field';
import TextField from '../components/input_fields/text_field';
import StaticField from '../components/input_fields/static_field';

// other components
import Button from '../components/button';

const stories = storiesOf('Utils', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('copyToClipboard', withState({ value: null })(withInfo('Text input field')(({ store }) => (
    <div style={{ width: 350 }}>
        <TextareaField
            value={store.state.value}
            id="copyText"
            onChangeHandler={(id, value) => store.set({ value })}
            label="Text to copy"
        />
        <Button onClickHandler={() => copyToClipboard(store.state.value)}>
            Copy to clipboard
        </Button>
    </div>
))));

const defaultDownloadState = { fileName: 'downloaded.txt', content: '', contentType: 'text/plain' };

stories.add('downloadFile', withState(defaultDownloadState)(withInfo('Text input field')(({ store }) => {
    const { fileName, content, contentType } = store.state;
    return (
        <div style={{ width: 350 }}>
            <TextField
                value={store.state.fileName}
                id="fileName"
                onChangeHandler={(id, value) => store.set({ fileName: value })}
                label="File name"
            />
            <TextareaField
                value={store.state.content}
                id="content"
                onChangeHandler={(id, value) => store.set({ content: value })}
                label="File Contents"
            />
            <TextField
                value={store.state.contentType}
                id="contentType"
                onChangeHandler={(id, value) => store.set({ contentType: value })}
                label="Content Type"
            />
            <Button onClickHandler={() => downloadFile(fileName, content, contentType)}>
                Download file
            </Button>
        </div>
    );
})));

stories.add('splitTextByNewLine', withState({ value: null })(withInfo('Text input field')(({ store }) => (
    <div style={{ width: 350 }}>
        <TextareaField
            value={store.state.value}
            id="splitText"
            onChangeHandler={(id, value) => store.set({ value })}
            label="Text to split"
        />
        <StaticField value={splitTextByNewLine(store.state.value)} id="splitResult" label="Result" />
    </div>
))));
