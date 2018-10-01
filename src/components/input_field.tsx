// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import NumberField from './input_fields/number_field';
import TextareaField from './input_fields/textarea_field';
import SelectField from './input_fields/select_field';
import CheckboxField from './input_fields/checkbox_field';
import ImageUploadField from './input_fields/image_upload_field';
import DateField from './input_fields/date_field';
import FileUploadField from './input_fields/file_upload_field';
import ChildrenField from './input_fields/children_field';
import TagsField from './input_fields/tags_field';
import TextField from './input_fields/text_field';

import {SelectOption} from './select_list';
import {ImageShape} from './image';
import {ImageFile} from './image_upload';
import {InputFieldProps} from './input_fields/input_field_wrapper';


export type InputFieldValue = string | number | boolean | ImageFile | string[] | HTMLInputElement;
export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' |
    'image' | 'date' | 'file' | 'tags' | 'children';

export interface OldInputFieldProps extends InputFieldProps {
    /** The current value of the field */
    value: InputFieldValue;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: InputFieldValue) => void;
    /** html placeholder text */
    placeholder?: string;
    /** The type of the input **/
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

/**
 * Class that adds an input wrapper around a ImageUpload component.
 * TODO: merge the two components
 */
export class InputField extends React.Component<OldInputFieldProps, {}> {
    static defaultProps = {
        type: 'text',
        labelLayoutWidth: '1/1',
        labelWidthBreakpoint: 'sm',
        staticField: false,
    };

    private readonly input_fields = {
        number: NumberField,
        textarea: TextareaField,
        select: SelectField,
        checkbox: CheckboxField,
        image: ImageUploadField,
        date: DateField,
        file: FileUploadField,
        children: ChildrenField,
        tags: TagsField,
    };

    render() {
        const {type, value, children, ...wrapperProps} = this.props;
        if (type === 'text' || type === 'password' || type === 'email' || type === 'url') {
            return <TextField value={value && value.toString()} type={type} {...wrapperProps}>{children}</TextField>;
        } else {
            const Component = this.input_fields[type];
            return <Component value={value} {...wrapperProps}>{children}</Component>;
        }
    }
}

export default InputField;
