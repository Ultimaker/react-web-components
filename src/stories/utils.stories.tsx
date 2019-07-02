import * as React from 'react';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import styles from '@sambego/storybook-styles';
/* eslint-enable */

// utils
import copyToClipboard from '../utils/copy_to_clipboard';
import downloadFile from '../utils/download_file';
import splitTextByNewLine from '../utils/split_text_by_new_line';
import arrayIntersection from '../utils/array_intersection';

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

stories.add('Copy to clipboard', withState({ value: null })(withInfo('Text input field')(({ store }) => (
    <div style={{ width: 350 }}>
        <TextareaField
            value={store.state.value}
            id="copyText"
            onChangeHandler={(id, value) => store.set({ value })}
            label="Text to copy"
        />
        <br />
        <Button onClickHandler={() => copyToClipboard(store.state.value)}>
            Copy to clipboard
        </Button>
    </div>
))));

const defaultDownloadState = { fileName: 'downloaded.txt', content: '', contentType: 'text/plain' };

stories.add('Download file', withState(defaultDownloadState)(withInfo('Text input field')(({ store }) => {
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
            <br />
            <Button onClickHandler={() => downloadFile(fileName, content, contentType)}>
                Download file
            </Button>
        </div>
    );
})));

stories.add('Split text by new line', withState({ value: null })(withInfo('Text input field')(({ store }) => (
    <div style={{ width: 350 }}>
        <TextareaField
            value={store.state.value}
            id="splitText"
            onChangeHandler={(id, value) => store.set({ value })}
            label="Text to split"
        />
        <br />
        <StaticField value={splitTextByNewLine(store.state.value)} id="splitResult" label="Result" />
    </div>
))));

stories.add('Array intersection', withState({
    array1: ['1', '2', '3', '4', '5'],
    array2: ['4', '5', '6', '7', '8'],
    result: ['4', '5'],
})(withInfo('Array intersection')(({ store }) => {
    const { array1, array2, result } = store.state;
    return (
        <div style={{ width: 350 }}>
            <TextField
                value={array1}
                id="array1"
                onChangeHandler={(id, value) => store.set({
                    array1: value.split(','),
                    result: arrayIntersection(value.split(','), array2),
                })}
                label="array1"
            />
            <TextField
                value={array2}
                id="array2"
                onChangeHandler={(id, value) => store.set({
                    array2: value.split(','),
                    result: arrayIntersection(array1, value.split(',')),
                })}
                label="array2"
            />
            <br />
            <TextField
                value={result}
                id="result"
                onChangeHandler={() => null}
                label="result"
            />
            <br />
        </div>
    );
})));
