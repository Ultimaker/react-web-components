import * as React from 'react';
import classNames from 'classnames';

// components
import { Image, ImageShape } from './image';
import UploadIcon from './icons/upload_icon';
import ImageCropper from './image_cropper';
import ProfileImage from './profile_image';
import BoxPlaceholder from './box_placeholder';

// dependencies
let Dropzone = require('react-dropzone');
// needs to be imported this way to keep jest happy
if ('default' in Dropzone) {
    /* istanbul ignore next */ // ignores coverage for this line.
    Dropzone = Dropzone.default;
}

export type ImagePlaceholderType = 'person' | 'other';

/**
 * This interface adds an image preview URL to blob files.
 * Note: To avoid memory leaks, call window.URL.revokeObjectURL(image.preview)
 * after done using the URL.
 */
export interface ImageFile extends File {
    preview?: string;
}

export interface ImageUploadProps {
    /** The ImageUpload list id */
    id?: string;
    /** Called when an image has been selected */
    onFileSelection?: (file: ImageFile) => any;
    /** Called when an image has been read */
    onFileRead?: (dataURL: string) => any;
    /** Size of the image. Include size unit */
    size?: string;
    /** Shape of the image: 'round' | 'square' */
    shape?: ImageShape;
    /** Image URL */
    imageURL?: string;
    /** Placeholder label */
    placeholderLabel?: string;
    /** Placeholder type: 'person' | 'other' */
    placeholderType?: ImagePlaceholderType;
    /** The maximum amount of megabytes allowed to be uploaded */
    maxMb?: number;
    /**
     * Whether cropping should be enabled. If enabled, the user is allowed to choose what
     * part of the image to use. For every change, the `onFileRead` callback is called.
     */
    allowCropping?: boolean;
}

export interface ImageUploadState {
    /** Whether the user is currently dropping a file in this component */
    dropActive: boolean;
    /**
     * The URL the user started cropping with.
     * This is used to keep the whole image even then the imageURL changed
     */
    cropURL: string | null;
    /** Whether the component is focused using the keyboard */
    dropFocus: boolean;
}

/**
 * Component that allows a user to upload (and optionally crop) an image.
 */
export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
    public static defaultProps: Partial<ImageUploadProps> = {
        shape: 'round',
        size: '18rem',
    };

    state: ImageUploadState = {
        dropActive: false,
        cropURL: null,
        dropFocus: false,
    };

    constructor(props) {
        super(props);

        this._onDropHandler = this._onDropHandler.bind(this);
        this._onDragEnter = this._onDragEnter.bind(this);
        this._onDragLeave = this._onDragLeave.bind(this);
        this._onCropCancel = this._onCropCancel.bind(this);
        this._onDragFocus = this._onDragFocus.bind(this);
        this._onDragBlur = this._onDragBlur.bind(this);
    }

    private _onDropHandler(files: ImageFile[]): void {
        const file = files[0];
        this.setState({ dropActive: false });
        const {
            allowCropping, onFileSelection, onFileRead, maxMb,
        } = this.props;
        if (maxMb && file.size > maxMb * 1024 * 1024) {
            // TODO: Make this a proper error in STAR-334.
            return;
        }

        if (onFileSelection) {
            onFileSelection(file);
        }


        const reader = new FileReader();
        reader.onload = () => {
            if (allowCropping) {
                this.setState({ cropURL: reader.result as string });
            }

            if (onFileRead) {
                onFileRead(reader.result as string);
            }
        };
        reader.onerror = console.error;
        reader.readAsDataURL(file);
    }

    private _onDragEnter(): void {
        this.setState({ dropActive: true });
    }

    private _onDragLeave(): void {
        this.setState({ dropActive: false });
    }

    private _onDragFocus(): void {
        this.setState({ dropFocus: true });
    }

    private _onDragBlur(): void {
        this.setState({ dropFocus: false });
    }

    private _onCropCancel(): void {
        const { onFileRead } = this.props;
        onFileRead(null);
        this.setState({ cropURL: null });
    }

    private _renderCropper(): JSX.Element {
        const { size, shape, onFileRead } = this.props;
        const { cropURL } = this.state;
        return (
            <ImageCropper
                onImageChanged={onFileRead}
                imageURL={cropURL}
                size={size}
                shape={shape}
                onCropCancel={this._onCropCancel}
            />
        );
    }

    private _renderPlaceholder(): JSX.Element {
        const { size, shape, placeholderType } = this.props;

        switch (placeholderType) {
        case 'person':
            return <ProfileImage size={size} />;
        case 'other':
            return <BoxPlaceholder backgroundColor="light" size={size} />;
        default:
            return <div className={`placeholder placeholder--${shape}`} />;
        }
    }

    private _renderDropzone(): JSX.Element {
        const {
            size, shape, imageURL, placeholderLabel, placeholderType,
        } = this.props;
        const { dropActive, dropFocus } = this.state;

        const iconClasses = classNames({
            hide: imageURL !== null || placeholderType !== undefined,
            'icon-with-label': placeholderLabel,
        });
        const hoverAreaClasses = classNames('hover-area', { show: dropActive || dropFocus });

        return (
            <div style={{ height: size, width: size }}>
                <Dropzone
                    accept="image/jpeg, image/png"
                    multiple={false}
                    onDragEnter={this._onDragEnter}
                    onDragLeave={this._onDragLeave}
                    onDrop={this._onDropHandler}
                    onFocus={this._onDragFocus}
                    onBlur={this._onDragBlur}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={hoverAreaClasses}>
                            <input {...getInputProps()} />
                            <div className={iconClasses}>
                                <UploadIcon />
                                {placeholderLabel && (
                                    <div className="placeholder-label">
                                        {placeholderLabel}
                                    </div>
                                )}
                            </div>

                            {imageURL
                                && <div className={`cover cover--${shape}`} />
                            }
                        </div>
                    )}
                </Dropzone>
                {imageURL
                    ? <Image src={imageURL} shape={shape} size={size} />
                    : this._renderPlaceholder()
                }
            </div>
        );
    }

    render(): JSX.Element {
        const { id } = this.props;
        const { cropURL } = this.state;
        return (
            <div id={id} className="image-upload">
                {cropURL ? this._renderCropper() : this._renderDropzone()}
            </div>
        );
    }
}

export default ImageUpload;
