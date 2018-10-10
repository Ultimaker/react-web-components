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
import bytesToSize from '../utils/bytes_to_size'
import {I18n} from '../utils/i18n';
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
    id: string;
    /** Called when an image has been selected */
    onFileSelection?: (file: ImageFile) => any;
    /** Called when an image has been read */
    onFileRead?: (file: ImageFile, fileContents: string) => any;
    /** Size of the image. Include size unit */
    size?: string;
    /** Shape of the image: 'round' | 'square' */
    shape?: ImageShape;
    /** Image URL */
    imageURL?: string;
    /** Placeholder label */
    placeholderLabel?: string;
    /** Maximum size in bytes **/
    maxBytes?: number;
    /** Whether cropping should be enabled **/
    allowCropping?: boolean;
}

export interface ImageUploadState {
    dropActive: boolean;
    cropURL: string | null;
    errorMessage: string | null;
}

export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {

    public static defaultProps: Partial<ImageUploadProps> = {
        shape: 'round',
        size: '18rem',
    };

    state = {
        dropActive: false,
        cropURL: null,
        errorMessage: null,
        file: null,
    }

    constructor(props) {
        super(props);

        this._onDropHandler = this._onDropHandler.bind(this);
        this._onDragEnter = this._onDragEnter.bind(this);
        this._onDragLeave = this._onDragLeave.bind(this);
        this._onCrop = this._onCrop.bind(this);
        this._onCropCancel = this._onCropCancel.bind(this);
    }

    private get _style() {
        const size = this.props.size;
        return {height: size, width: size}
    }

    private _onDropHandler(files: ImageFile[]): void {
        const file = files[0];
        this.setState({
            dropActive: false,
            errorMessage: null,
        });

        const {maxBytes, allowCropping, onFileSelection, onFileRead} = this.props;

        if (maxBytes && file.size > maxBytes) {
            return this.setState({
                errorMessage: I18n.format(
                    'image upload error',
                    'The image uploaded is larger than %{maxSize}.',
                    {maxSize: bytesToSize(maxBytes)}
                )
            });
        }

        if (onFileSelection) {
            onFileSelection(file);
        }

        if (onFileRead) {
            const reader = new FileReader();
            reader.onload = () => onFileRead(file, reader.result as string);
            reader.onerror = console.error; // TODO
            reader.readAsDataURL(file);
        }

        if (allowCropping) {
            return this.setState({cropURL: file.preview});
        }
    }

    private _onDragEnter(): void {
        this.setState({
            dropActive: true
        });
    }

    private _onDragLeave(): void {
        this.setState({
            dropActive: false
        });
    }

    private _onCropCancel(): void {
        this.setState({cropURL: null})
    }

    private _onCrop(data: string): void {
        const {onFileRead} = this.props;
        if (onFileRead) {
            const file = {preview: data} as ImageFile;
            onFileRead(file, data)
        }
    }

    private _renderCropper(): JSX.Element {
        const { size, shape } = this.props;
        const { cropURL } = this.state;
        return <ImageCropper
            onImageChanged={this._onCrop}
            imageURL={cropURL}
            size={size}
            shape={shape}
        />;
    }

    private _renderDropzone(): JSX.Element {
        const { size, shape, imageURL, placeholderLabel } = this.props;
        const { dropActive, errorMessage } = this.state;

        const iconClasses = classNames({ 'hide': imageURL !== null, 'icon-with-label': placeholderLabel });
        const hoverAreaClasses = classNames('hover-area', { 'show': dropActive });

        return <Dropzone
            style={this._style}
            accept="image/jpeg, image/png"
            multiple={false}
            onDragEnter={this._onDragEnter}
            onDragLeave={this._onDragLeave}
            onDrop={this._onDropHandler}
        >
            <div className={hoverAreaClasses}>
                <div className={iconClasses}>
                    <UploadIcon/>
                    {errorMessage ?
                        <div className="error-message">
                            {errorMessage}
                        </div>
                        : placeholderLabel &&
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
