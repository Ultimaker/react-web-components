import * as React from 'react'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'
import Textarea from '../textarea'

    /** Whether the textarea should grow horizontally with user input */
    textareaAutoGrow?: boolean;

const TextareaField: React.StatelessComponent<InputFieldProps> = ({
    id, placeholder, value, focusOnLoad, onChangeHandler, textareaAutoGrow
}) =>
    <Textarea
        id={id}
        onChangeHandler={value => onChangeHandler(id, value)}
        placeholder={placeholder}
        value={value != null ? value.toString() : ''}
        autofocus={focusOnLoad}
        autoGrow={textareaAutoGrow}
    />

TextareaField.displayName = "TextareaField"

export default InputFieldWrapper(TextareaField)
