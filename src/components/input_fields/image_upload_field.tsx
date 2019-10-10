// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, { InputFieldProps } from './input_field_wrapper';
import ImageUpload, { ImageFile, ImagePlaceholderType } from '../image_upload';
import { Image, ImageShape } from '../image';
import { BoxPlaceholder } from '../box_placeholder';
import { ProfileImage } from '../profile_image';


/**
 * The image upload field provides these props in addition to those supported by all input fields.
 */
export interface ImageUploadFieldProps extends InputFieldProps {
    /** Size of the image for type image. Include size unit */
    imageSize?: string;

    /** Shape of the image for type image: 'round' | 'square' */
    imageShape?: ImageShape;

    /** Called when the field changes */
    onChangeHandler?: (id: string, value: ImageFile) => any;

    /** Called when an image file is read */
    onReadHandler?: (id: string, dataURL: string) => any;

    /** html placeholder text */
    placeholder?: string;

    /** The file URL or preview URL */
    value: string;

    /** Whether cropping should be enabled */
    allowCropping?: boolean;

    /** The maximum amount of megabytes allowed to be uploaded */
    maxMb?: number;

    /** Placeholder type: 'person' | 'other' */
    placeholderType?: ImagePlaceholderType;
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
 * TODO: merge ImageUpload and ImageUploadField?
 */
export class ImageUploadField extends React.Component
<ImageUploadFieldProps, ImageUploadFieldState> {
    state = {
        touched: false,
    };

    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    private _onChange(value: ImageFile): void {
        this.setState({ touched: true });
        const { onChangeHandler, id } = this.props;
        if (onChangeHandler) {
            onChangeHandler(id, value);
        }
    }

    private _onFileRead(contents: string): void {
        const { onReadHandler, id } = this.props;

        if (onReadHandler) {
            onReadHandler(id, contents);
        }
    }

    private _renderImageOrPlaceholder(): JSX.Element {
        const {
            value, imageSize, imageShape, placeholderType,
        } = this.props;

        if (value) {
            return <Image src={value} size={imageSize} shape={imageShape} />;
        }

        if (placeholderType === 'person') {
            return <ProfileImage size={imageSize} />;
        }

        return <BoxPlaceholder size={imageSize} />;
    }

    render() {
        const {
            imageSize, imageShape, placeholder, value, onReadHandler,
            children, allowCropping, maxMb, placeholderType, ...wrapperProps
        } = this.props;
        const { id, staticField } = wrapperProps;
        const { touched } = this.state;
        return (
            <InputFieldWrapper touched={touched} inputChildren={children} {...wrapperProps}>
                {
                    staticField
                        ? this._renderImageOrPlaceholder()
                        : (
                            <ImageUpload
                                id={id}
                                maxMb={maxMb}
                                size={imageSize}
                                imageURL={value && value.toString()}
                                onFileSelection={this._onChange}
                                onFileRead={(contents) => this._onFileRead(contents)}
                                shape={imageShape}
                                placeholderLabel={placeholder}
                                placeholderType={placeholderType}
                                allowCropping={allowCropping}
                            />
                        )
                }
            </InputFieldWrapper>
        );
    }
}

export default ImageUploadField;
