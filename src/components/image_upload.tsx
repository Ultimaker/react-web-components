import * as React from 'react';
import Dropzone from 'react-dropzone';
import * as classNames from 'classnames';

import { Image, ImageShape } from './image';

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
}

export class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {

  public static defaultProps: Partial<ImageUploadProps> = {
    shape: 'round',
    size: '18rem'
  };

  state = {
    fileURL: null
  }

  static getDerivedStateFromProps(props: ImageUploadProps, state: ImageUploadState): ImageUploadState {
    if (props.defaultURL && state.fileURL === null) {
      return {
        fileURL: props.defaultURL
      }
    }
    return null;
  }

  _onDropHandler(files: ImageFile[]): void {
    const file = files[0];
    this.setState({ fileURL: file.preview });
    this.props.onFileSelection(file);
  }

  render(): JSX.Element {
    const { size, shape } = this.props;
    const { fileURL } = this.state;

    const iconClasses = classNames('icon', { 'hide': fileURL !== null });

    return <Dropzone accept="image/jpeg, image/png" multiple={false} className="image-upload" style={{ width: size, height: size }}
      onDrop={(files) => this._onDropHandler(files)}>

      <div className="hover">
        <div className={iconClasses}>
          <svg viewBox="0 0 24 24">
            <g>
              <path d="M19.35,10.04C18.67,6.59,15.64,4,12,4C9.11,4,6.6,5.64,5.35,8.04C2.34,8.36,0,10.91,0,14c0,3.31,2.69,6,6,6h13
                c2.76,0,5-2.24,5-5C24,12.36,21.95,10.22,19.35,10.04z M19,18H6c-2.21,0-4-1.79-4-4c0-2.05,1.53-3.76,3.56-3.97l1.07-0.11
                l0.5-0.95C8.08,7.14,9.94,6,12,6c2.62,0,4.88,1.86,5.39,4.43l0.3,1.5l1.53,0.11C20.78,12.14,22,13.45,22,15
                C22,16.65,20.65,18,19,18z"/>
              <polygon points="8,13 10.55,13 10.55,16 13.45,16 13.45,13 16,13 12,9 		"/>
            </g>
          </svg>
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