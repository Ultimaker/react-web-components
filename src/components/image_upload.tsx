import * as React from 'react';
import Dropzone from 'react-dropzone';

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

  constructor(props) {
    super(props);

    this.state = {
      fileURL: null
    }
  }

  static getDerivedStateFromProps(props: ImageUploadProps, state: ImageUploadState): ImageUploadState{
    if(props.defaultURL && state.fileURL === null){
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

    return <Dropzone accept="image/jpeg, image/png" className="image-upload" onDrop={(files) => this._onDropHandler(files)}>
      {fileURL &&
        <Image src={fileURL} shape={shape} size={size} />
      }
      {!fileURL &&
        <div className={`placeholder placeholder--${shape}`} style={{ width: size, height: size }}>
          <svg viewBox="0 0 12 14">
            <path d="M11.469 2.969q0.219 0.219 0.375 0.594t0.156 0.688v9q0 0.312-0.219 0.531t-0.531 0.219h-10.5q-0.312 0-0.531-0.219t-0.219-0.531v-12.5q0-0.312 0.219-0.531t0.531-0.219h7q0.312 0 0.688 0.156t0.594 0.375zM8 1.062v2.937h2.937q-0.078-0.227-0.172-0.32l-2.445-2.445q-0.094-0.094-0.32-0.172zM11 13v-8h-3.25q-0.312 0-0.531-0.219t-0.219-0.531v-3.25h-6v12h10zM10 9.5v2.5h-8v-1.5l1.5-1.5 1 1 3-3zM3.5 8q-0.625 0-1.062-0.438t-0.438-1.062 0.438-1.062 1.062-0.438 1.062 0.438 0.438 1.062-0.438 1.062-1.062 0.438z"></path>
          </svg>
        </div>
      }
    </Dropzone>
  }
}

export default ImageUpload;