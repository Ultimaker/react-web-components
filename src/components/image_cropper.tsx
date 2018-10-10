import * as React from 'react'
import * as AvatarEditor from 'react-avatar-editor'
import {ImageShape} from './image'
import {debounce} from 'lodash'

let Dropzone = require('react-dropzone') // needs to be imported this way to keep jest happy
if ('default' in Dropzone) {
    Dropzone = Dropzone.default
}

export interface ImageCropperProps {
    /** Size of the image. Include size unit */
    size?: string;
    
    /** Shape of the image: 'round' | 'square' */
    shape?: ImageShape;
    
    /** Whether the user allowed to zoom out the uploaded image **/
    allowZoomOut?: boolean;
    
    /** Image URL */
    imageURL?: string;

    /** Callback for when the image is changed **/
    onImageChanged: (data: string) => any;
}

export interface ImageCropperState {
    position: { x: number, y: number };
    scale: number;
}

export class ImageCropper extends React.Component<ImageCropperProps, ImageCropperState> {
    static defaultProps: ImageCropperProps = {
        shape: 'square',
        size: '200px',
        allowZoomOut: false,
        imageURL: 'https://react-avatar-editor.netlify.com/avatar.jpg',
        onImageChanged: () => { throw new Error("ImageCropper.onImageChanged not given.") },
    }

    state: ImageCropperState = {
        position: {x: 0.5, y: 0.5},
        scale: 1,
    }

    editor: {
        getImage(): HTMLCanvasElement;
        getImageScaledToCanvas(): HTMLCanvasElement;
        getCroppingRect(): {
            x: number;
            y: number;
            width: number;
            height: number;
        }
    }

    constructor(props) {
        super(props)
        this._onImageChanged = this._onImageChanged.bind(this)
        this._onScaleChanged = this._onScaleChanged.bind(this)
        this._onPositionChanged = this._onPositionChanged.bind(this)
    }

    _onImageChanged = debounce(() => {
        const canvas = this.editor.getImage();
        const imageData = canvas.toDataURL();
        this.props.onImageChanged(imageData);
    }, 100);

    private _onScaleChanged(e:  React.ChangeEvent<HTMLInputElement>): void {
        const scale = parseFloat(e.target.value)
        this.setState({scale})
        this._onImageChanged()
    }

    private _onPositionChanged(position: {x: number, y: number}): void {
        this.setState({position})
        this._onImageChanged()
    }

    render() {
        const {size} = this.props
        const sizeScale = size.endsWith("rem") ? 10 : 1
        const sizePixels = parseFloat(size) * sizeScale
        const borderRadius = this.props.shape == 'round' ? 100 : 0
        return (
            <div>
                <AvatarEditor
                    ref={editor => this.editor = editor}
                    scale={this.state.scale}
                    width={sizePixels}
                    height={sizePixels}
                    position={this.state.position}
                    onPositionChange={this._onPositionChanged}
                    borderRadius={borderRadius}
                    image={this.props.imageURL}
                    className="editor-canvas"
                />
                <input
                    name="scale"
                    type="range"
                    onChange={this._onScaleChanged}
                    min={this.props.allowZoomOut ? '0.1' : '1'}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />
            </div>
        )
    }
}

export default ImageCropper
