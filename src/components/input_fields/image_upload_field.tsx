import * as React from 'react'

import InputFieldWrapper, {InputFieldProps, StaticFieldProps} from './input_field_wrapper'
import {ImageUpload} from '../image_upload'
import {Image, ImageShape} from '../image'



interface BaseImageFieldProps {
    /** Size of the image for type image. Include size unit */
    imageSize?: string;
    /** Shape of the image for type image: 'round' | 'square' */
    imageShape?: ImageShape;
}

interface ImageFieldProps extends InputFieldProps, BaseImageFieldProps {}

export const ImageUploadField: React.StatelessComponent<ImageFieldProps> = (
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


interface StaticImageFieldProps extends StaticFieldProps, BaseImageFieldProps {}

export const StaticImageField: React.StatelessComponent<StaticImageFieldProps> = (
    {value, imageSize, imageShape}
) =>
    <Image src={value ? value.toString() : null} size={imageSize} shape={imageShape}/>;

StaticImageField.displayName = "StaticImageField";

export default InputFieldWrapper(ImageUploadField, StaticImageField)
