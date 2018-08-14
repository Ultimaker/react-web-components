import * as React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

import { Image, ImageShape } from './image';
import UploadIcon from './icons/upload_icon'

export interface ImageFile extends File {
  preview?: string;
}

export interface ImageUploadProps {
  /** Called when a image has been selected */
  onFileSelection: (file: ImageFile) => void;
  /** Size of the image. Include size unit */
  size?: string;
  /** Shape of the image: 'round' | 'square' */
  shape?: ImageShape;
  /** Default image URL */
  defaultURL?: string
}

export interface ImageUploadState {
  fileURL: string;
  dropActive: boolean;
}

export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {

  public static displayName = 'ImageUpload';

  public static defaultProps: Partial<ImageUploadProps> = {
    shape: 'round',
    size: '18rem'
  };

  state = {
    fileURL: null,
    dropActive: false
  }

  constructor(props) {
    super(props);

    this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragLeave = this._onDragLeave.bind(this);
  }

  static getDerivedStateFromProps(props: ImageUploadProps, state: ImageUploadState): Partial<ImageUploadState> {
    if (props.defaultURL && state.fileURL === null) {
      return {
        fileURL: props.defaultURL
      }
    }
    return null;
  }

  _onDropHandler(files: ImageFile[]): void {
    this.setState({
      dropActive: false
    });
    
    const file = files[0];
    this.setState({ fileURL: file.preview });
    this.props.onFileSelection(file);
  }

  _onDragEnter(): void {
    this.setState({
      dropActive: true
    });
  }

  _onDragLeave(): void {
    this.setState({
      dropActive: false
    });
  }

  render(): JSX.Element {
    const { size, shape } = this.props;
    const { fileURL, dropActive } = this.state;

    const iconClasses = classNames({ 'hide': fileURL !== null });
    const hoverAreaClasses = classNames('hover-area', { 'show': dropActive });

    return <Dropzone className="image-upload" style={{ width: size, height: size }}
      accept="image/jpeg, image/png" 
      multiple={false} 
      onDragEnter={this._onDragEnter}
      onDragLeave={this._onDragLeave}
      onDrop={(files) => this._onDropHandler(files)}
    >

      <div className={hoverAreaClasses}>
        <div className={iconClasses}>
          <UploadIcon />
        </div>

        {fileURL &&
          <div className={`cover cover--${shape}`}></div>
        }
      </div>
      
      {!fileURL &&
        <div className={`placeholder placeholder--${shape}`}></div>
      }
      
      {fileURL &&
        <Image src={fileURL} shape={shape} size={size} />
      }
      
    </Dropzone>
  }
}

export default ImageUpload;