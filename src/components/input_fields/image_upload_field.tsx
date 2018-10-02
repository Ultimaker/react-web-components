// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import ImageUpload, {ImageFile} from '../image_upload';
import {Image, ImageShape} from '../image';


/**
 * The image upload field provides these props in addition to those supported by all input fields.
 */
export interface ImageUploadFieldProps extends InputFieldProps {
    /** Size of the image for type image. Include size unit */
    imageSize: string;

    /** Shape of the image for type image: 'round' | 'square' */
    imageShape: ImageShape;

    /** Called when the field changes */
    onChangeHandler: (id: string, value: ImageFile) => any;

    /** Called when an image file is read */
    onReadHandler: (id: string, file: ImageFile, contents: string) => any;

    /** html placeholder text */
    placeholder?: string;

    /** The file URL or preview URL **/
    value: string;
}

/**
 * The image upload field keeps track of whether it has been touched.
 */
export interface ImageUploadFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a ImageUpload component.
 * TODO: merge the two components
 */
class ImageUploadField extends React.Component<ImageUploadFieldProps, ImageUploadFieldState> {
    state = {
        touched: false
    };

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(value: ImageFile): void {
        this.setState({touched: true});
        const {onChangeHandler, id} = this.props;
        if (onChangeHandler) {
            onChangeHandler(id, value);
        }
    }

    render() {
        const {imageSize, imageShape, placeholder, value, onReadHandler, ...wrapperProps} = this.props;
        const {id, staticField} = wrapperProps;
        const {touched} = this.state;
        return <InputFieldWrapper touched={touched} {...wrapperProps}>{
            staticField ?
                <Image src={value} size={imageSize} shape={imageShape}/> :
                <ImageUpload
                    id={id}
                    size={imageSize}
                    imageURL={value && value.toString()}
                    onFileSelection={this._onChange}
                    onFileRead={(file, contents) => onReadHandler(id, file, contents)}
                    shape={imageShape}
                    placeholderLabel={placeholder}
                />
        }</InputFieldWrapper>;
    }
}

export default ImageUploadField;
