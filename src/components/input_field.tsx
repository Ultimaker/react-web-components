import * as React from 'react';

import {InputFieldProps} from './input_fields/input_field_wrapper'
import NumberField from './input_fields/number_field'
import TextareaField from './input_fields/textarea_field'
import SelectField from './input_fields/select_field'
import CheckboxField from './input_fields/checkbox_field'
import ImageField from './input_fields/image_field'
import DateField from './input_fields/date_field'
import FileField from './input_fields/file_field'
import ChildrenField from './input_fields/children_field'
import TagsField from './input_fields/tags_field'
import TextField from './input_fields/text_field'

export interface OldInputFieldProps extends InputFieldProps {
    type?: 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' |
        'image' | 'date' | 'file' | 'tags' | 'children';
}

const input_fields = {
    number: NumberField,
    textarea: TextareaField,
    select: SelectField,
    checkbox: CheckboxField,
    image: ImageField,
    date: DateField,
    file: FileField,
    children: ChildrenField,
    tags: TagsField,
}

/**
 * @deprecated - Use the separate components
 */
const InputField: React.StatelessComponent<OldInputFieldProps> = ({type, ...props}) => {
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
