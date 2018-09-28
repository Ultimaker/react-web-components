import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps, StaticFieldProps} from './input_field_wrapper'
import {Image, ImageShape} from '../image'

interface ImageProps {
    /** Size of the image for type image. Include size unit */
    imageSize?: string;
    /** Shape of the image for type image: 'round' | 'square' */
    imageShape?: ImageShape;
}

interface StaticImageFieldProps extends StaticFieldProps, ImageProps {}

export const StaticImageField: React.StatelessComponent<StaticImageFieldProps> = (
    {value, imageSize, imageShape}
) =>
    <Image src={value ? value.toString() : null} size={imageSize} shape={imageShape}/>;

StaticImageField.displayName = "StaticImageField"

interface ImageFieldProps extends InputFieldProps, ImageProps {}

export const ImageField: React.StatelessComponent<ImageFieldProps> = ({}) => <div />;

ImageField.displayName = "ImageField";

export default InputFieldWrapper(ImageField, StaticImageField)
