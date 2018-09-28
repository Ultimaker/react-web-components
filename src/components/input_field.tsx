import * as React from 'react';

import {InputFieldProps, InputFieldWrapperProps} from './input_fields/input_field_wrapper';
import NumberField from './input_fields/number_field';
import TextareaField from './input_fields/textarea_field';
import SelectField from './input_fields/select_field';
import CheckboxField from './input_fields/checkbox_field';
import ImageUploadField from './input_fields/image_upload_field';
import DateField from './input_fields/date_field';
import FileField from './input_fields/file_field';
import ChildrenField from './input_fields/children_field';
import TagsField from './input_fields/tags_field';
import TextField from './input_fields/text_field';
import {SelectOption} from './select_list';
import {ImageShape} from './image';


export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' |
    'image' | 'date' | 'file' | 'tags' | 'children';

export interface OldInputFieldProps extends InputFieldProps, InputFieldWrapperProps {
    type?: InputFieldType;
    /** Minimum value for number field */
    min?: number;
    /** Maximum value for number field */
    max?: number;
    /** Whether the textarea should grow horizontally with user input */
    textareaAutoGrow?: boolean;
    /** A list of suggestions for tags input field */
    tagSuggestions?: string[];
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** List of options for type select */
    selectOptions?: SelectOption[];
    /** Size of the image for type image. Include size unit */
    imageSize?: string;
    /** Shape of the image for type image: 'round' | 'square' */
    imageShape?: ImageShape;
}

const input_fields = {
    number: NumberField,
    textarea: TextareaField,
    select: SelectField,
    checkbox: CheckboxField,
    image: ImageUploadField,
    date: DateField,
    file: FileField,
    children: ChildrenField,
    tags: TagsField,
}

/**
 * @deprecated - Use the separate components
 */
export const InputField: React.StatelessComponent<OldInputFieldProps> = ({type, ...props}) => {
    if (type === 'text' || type === 'password' || type === 'email' || type === 'url') {
        return <TextField type={type} {...props} />;
    } else {
        let Component = input_fields[type];
        return <Component {...props} />;
    }
};

InputField.displayName = "InputField";
InputField.defaultProps = {
    type: 'text',
    labelLayoutWidth: '1/1',
    labelWidthBreakpoint: 'sm'
};

export default InputField;
