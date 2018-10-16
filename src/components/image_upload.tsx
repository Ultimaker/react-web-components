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
import Button from './button'
import RejectedIcon from './icons/rejected_icon'

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
    onFileRead?: (data: string) => any;
    /** If given, the user is allowed to remove the image. This callback is then called. **/
    onFileRemoved?: () => any;
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
    /** Whether the user is currently dropping a file in this component **/
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
        this._onFileRemoved = this._onFileRemoved.bind(this);
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
            reader.onload = () => onFileRead(reader.result as string);
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

    private _onFileRemoved(): void {
        this.props.onFileRemoved();
        this.setState({
            cropURL: null
        })
    }

    private _renderCropper(): JSX.Element {
        const { size, shape } = this.props;
        const { cropURL } = this.state;
        return <ImageCropper
            onImageChanged={this.props.onFileRead}
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
                    <UploadIcon />
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
        const { id, onFileRemoved, imageURL } = this.props;
        const { cropURL } = this.state;
        return <div id={id} className="image-upload">
            {cropURL ? this._renderCropper() : this._renderDropzone()}
            {onFileRemoved && imageURL &&
                <Button onClickHandler={this._onFileRemoved} style="quiet" shape="pill" className="remove-image">
                    <RejectedIcon size="lg" />
                </Button>
            }
        </div>
    }
}

export default ImageUpload;
