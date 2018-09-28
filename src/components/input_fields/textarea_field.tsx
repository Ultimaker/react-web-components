import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import Textarea from '../textarea';

interface TextareaFieldProps extends InputFieldProps {
    /** Whether the textarea should grow horizontally with user input */
    textareaAutoGrow?: boolean;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
}

const TextareaField: React.StatelessComponent<TextareaFieldProps> = ({
    id, placeholder, value, focusOnLoad, onChangeHandler, textareaAutoGrow
}) =>
    <Textarea
        id={id}
        onChangeHandler={value => onChangeHandler(id, value)}
        placeholder={placeholder}
        value={value != null ? value.toString() : ''}
        autofocus={focusOnLoad}
        autoGrow={textareaAutoGrow}
    />;

TextareaField.displayName = "TextareaField";

export default InputFieldWrapper(TextareaField);
