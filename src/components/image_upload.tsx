import * as React from 'react';
import classNames from 'classnames';

// dependencies
import ReactCropper from 'react-cropper';
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
import Button from './button'
import ApprovedIcon from './icons/approved_icon'
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
    cropActive: boolean;
    errorMessage: string | null;
    file: ImageFile | null;
}

export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {

    cropperRef = null;

    public static defaultProps: Partial<ImageUploadProps> = {
        shape: 'round',
        size: '18rem',
    };

    state = {
        dropActive: false,
        cropActive: false,
        errorMessage: null,
        file: null,
    }

    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
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
            file: file,
        });

        const {maxBytes, allowCropping} = this.props;

        if (maxBytes && file.size > maxBytes) {
            return this.setState({
                file: null,
                errorMessage: I18n.format(
                    'image upload error',
                    'The image uploaded is larger than %{maxSize}.',
                    {maxSize: bytesToSize(maxBytes)}
                )
            });
        }

        if (allowCropping) {
            return this.setState({cropActive: true});
        }
        this._onChange(file)
    }

    private _onChange(file: ImageFile, imageData?: string) {
        const {onFileRead, onFileSelection} = this.props;
        if (onFileSelection) {
            onFileSelection(file);
        }

        if (onFileRead) {
            if (imageData) {
                onFileRead(file, imageData)
            } else {
                const reader = new FileReader();
                reader.onload = () => onFileRead(file, reader.result as string);
                reader.onerror = console.error; // TODO
                reader.readAsDataURL(file);
            }
        }

        this.setState({file: null, cropActive: false});
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
        this.setState({cropActive: false})
    }

    private _onCrop(): void {
        const {file} = this.state;
        const cropped: HTMLCanvasElement = this.cropperRef.getCroppedCanvas()
        cropped.toBlob(blob => {
            const newFile = blob as ImageFile;
            window.URL.revokeObjectURL(file.preview);
            newFile.preview = window.URL.createObjectURL(blob, {oneTimeOnly: false});
            this._onChange(newFile, cropped.toDataURL(file.type));
        }, file.type);
    }

    private _renderCropper(): JSX.Element {
        const { file } = this.state;
        const { size } = this.props;
        return <div className="image-upload--cropper-container">
            <div className="image-upload--cropper">
                <ReactCropper
                    ref={input => this.cropperRef = input}
                    src={file.preview}
                    style={this._style}
                    aspectRatio={1} // force a fixed aspect ratio of 1
                    autoCropArea={1}  // by default select as much as possible of the image
                    minContainerWidth={1}
                />
            </div>
            <div className="image-upload--cropper-buttons">
                <Button onClickHandler={this._onCrop}
                        shape="circle">
                    <ApprovedIcon color="white"/>
                </Button>
                <Button onClickHandler={this._onCropCancel}
                        shape="circle">
                    <RejectedIcon color="white"/>
                </Button>
            </div>
        </div>;
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
        const { cropActive } = this.state;
        return <div id={id} className="image-upload">
            {cropActive ? this._renderCropper() : this._renderDropzone()}
        </div>
    }
}

export default ImageUpload;
