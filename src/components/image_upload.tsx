import * as React from 'react';
import classNames from 'classnames';

// dependencies
let Dropzone = require('react-dropzone'); // needs to be imported this way to keep jest happy
if ('default' in Dropzone) {
    Dropzone = Dropzone.default;
}

// components
import { Image, ImageShape } from './image';
import UploadIcon from './icons/upload_icon';

// utils
import ImageCropper from './image_cropper'

/**
 * This interface adds an image preview URL to blob files.
 * Note: To avoid memory leaks, call window.URL.revokeObjectURL(image.preview) after done using the URL.
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
    /**
     * Whether cropping should be enabled. If enabled, the user is allowed to choose what part of the image to use.
     * For every change, the `onFileRead` callback is called.
     **/
    allowCropping?: boolean;
}

export interface ImageUploadState {
    /** Whether the user is currently dropping a file in this component **/
    dropActive: boolean;
    /** The URL the user started cropping with. This is used to keep the whole image even then the imageURL changed **/
    cropURL: string | null;
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
    }

    constructor(props) {
        super(props);

        this._onDropHandler = this._onDropHandler.bind(this);
        this._onDragEnter = this._onDragEnter.bind(this);
        this._onDragLeave = this._onDragLeave.bind(this);
        this._onCropCancel = this._onCropCancel.bind(this);
    }

    private _onDropHandler(files: ImageFile[]): void {
        const file = files[0];
        this.setState({ dropActive: false });

        const {allowCropping, onFileSelection, onFileRead} = this.props;

        if (onFileSelection) {
            onFileSelection(file);
        }

        if (onFileRead) {
            const reader = new FileReader();
            reader.onload = () => onFileRead(reader.result as string);
            reader.onerror = console.error;
            reader.readAsDataURL(file);
        }

        if (allowCropping) {
            return this.setState({ cropURL: file.preview });
        }
    }

    private _onDragEnter(): void {
        this.setState({ dropActive: true });
    }

    private _onDragLeave(): void {
        this.setState({ dropActive: false });
    }

    private _onCropCancel(): void {
        this.props.onFileRead(null);
        this.setState({ cropURL: null })
    }

    private _renderCropper(): JSX.Element {
        const { size, shape, onFileRead } = this.props;
        const { cropURL } = this.state;
        return <ImageCropper
            onImageChanged={onFileRead}
            imageURL={cropURL}
            size={size}
            shape={shape}
            onCropCancel={() => this._onCropCancel()}
        />;
    }

    private _renderDropzone(): JSX.Element {
        const { size, shape, imageURL, placeholderLabel } = this.props;
        const { dropActive } = this.state;

        const iconClasses = classNames({ 'hide': imageURL !== null, 'icon-with-label': placeholderLabel });
        const hoverAreaClasses = classNames('hover-area', { 'show': dropActive });

        return <Dropzone
            style={{ height: size, width: size }}
            accept="image/jpeg, image/png"
            multiple={false}
            onDragEnter={this._onDragEnter}
            onDragLeave={this._onDragLeave}
            onDrop={this._onDropHandler}
        >
            <div className={hoverAreaClasses}>
                <div className={iconClasses}>
                    <UploadIcon />
                    {placeholderLabel &&
                        <div className="placeholder-label">
                            {placeholderLabel}
                        </div>
                    }
                </div>

                {imageURL &&
                    <div className={`cover cover--${shape}`}/>
                }
            </div>

            {imageURL ?
                <Image src={imageURL} shape={shape} size={size} />
                : <div className={`placeholder placeholder--${shape}`}/>
            }
        </Dropzone>
    }

    render(): JSX.Element {
        const { id } = this.props;
        const { cropURL } = this.state;
        return <div id={id} className="image-upload">
            {cropURL ? this._renderCropper() : this._renderDropzone()}
        </div>
    }
}

export default ImageUpload;
