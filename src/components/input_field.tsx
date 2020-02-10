// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import NumberField from './input_fields/number_field';
import TextareaField from './input_fields/textarea_field';
import { SelectField, SelectOption } from './input_fields/select_field';
import CheckboxField from './input_fields/checkbox_field';
import ImageUploadField from './input_fields/image_upload_field';
import DateField from './input_fields/date_field';
import FileUploadField from './input_fields/file_upload_field';
import ChildrenField from './input_fields/children_field';
import TagsField from './input_fields/tags_field';
import TextField from './input_fields/text_field';
import CodeField from './input_fields/code_field';
import SearchField from './input_fields/search_field';

import { ImageShape } from './image';
import { ImageFile } from './image_upload';
import { InputFieldProps } from './input_fields/input_field_wrapper';


export type InputFieldValue = string | number | boolean | ImageFile | string[] | HTMLInputElement;
export type InputFieldType = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'url' | 'select' | 'checkbox' |
    'image' | 'date' | 'file' | 'tags' | 'children';

/**
 * This components includes the custom props of all supported fields.
 */
export interface OldInputFieldProps extends InputFieldProps {
    /** The current value of the field */
    value: InputFieldValue;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: InputFieldValue) => void;
    /** html placeholder text */
    placeholder?: string;
    /** The type of the input */
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
    /** Maximum amount of characters allowed in the text field */
    maxLength?: number;
}

/**
 * This class is used in projects as a generic input field.
 * Now all fields are in separate components and should be used by themselves.
 * However this component is still available to be backwards compatible.
 */
export class InputField extends React.Component<OldInputFieldProps, {}> {
    private readonly inputFields = {
        number: NumberField,
        textarea: TextareaField,
        select: SelectField,
        checkbox: CheckboxField,
        image: ImageUploadField,
        date: DateField,
        file: FileUploadField,
        children: ChildrenField,
        tags: TagsField,
        text: TextField,
        password: TextField,
        email: TextField,
        url: TextField,
        code: CodeField,
        search: SearchField,
    };

    static defaultProps = {
        type: 'text',
        labelLayoutWidth: '1/1',
        labelWidthBreakpoint: 'sm',
        staticField: false,
        showValidationError: true,
    };

    render() {
        const { children, ...wrapperProps } = this.props;
        const Component = this.inputFields[wrapperProps.type];
        return <Component {...wrapperProps}>{children}</Component>;
    }
}

export default InputField;
