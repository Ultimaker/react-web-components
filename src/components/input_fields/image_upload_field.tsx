import * as React from 'react'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'
import {ImageUpload} from '../image_upload'


export const ImageUploadField: React.StatelessComponent<InputFieldProps> = (
    {id, imageSize, imageShape, placeholder, value, onChangeHandler}
) =>
    <ImageUpload
        id={id}
        size={imageSize}
        imageURL={value != null ? value.toString() : null}
        onFileSelection={value => onChangeHandler(id, value)}
        shape={imageShape}
        placeholderLabel={placeholder}
    />

ImageUploadField.displayName = "ImageUploadField";

export default InputFieldWrapper(ImageUploadField)
