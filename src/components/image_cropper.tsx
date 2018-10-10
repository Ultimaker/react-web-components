import * as React from 'react';
import * as AvatarEditor from 'react-avatar-editor';
import {ImageShape} from './image'
let Dropzone = require('react-dropzone'); // needs to be imported this way to keep jest happy
if ('default' in Dropzone) {
    Dropzone = Dropzone.default;
}

export interface ImageCropperProps {
    /** Size of the image for type image. Include size unit */
    imageSize?: string;

    /** Shape of the image for type image: 'round' | 'square' */
    imageShape?: ImageShape;

    /** Whether the user allowed to zoom out the uploaded image **/
    allowZoomOut?: boolean;
}

export interface ImageCropperState {
    image: string;
    position: { x: number, y: number };
    scale: number;
    preview: {
        rect: {
          width: number,
          height: number,
        },
        scale: number,
        image: string,
        width: number,
        height: number,
    };
    width: number;
    height: number;
}

export class ImageCropper extends React.Component<ImageCropperProps, ImageCropperState> {
    static defaultProps: ImageCropperProps = {
        imageShape: 'square',
        allowZoomOut: false,
    }

    state: ImageCropperState = {
        image: 'https://react-avatar-editor.netlify.com/avatar.jpg',
        position: {x: 0.5, y: 0.5},
        scale: 1,
        preview: null,
        width: 200,
        height: 200,
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

    private get _borderRadius(): number {
        return this.props.imageShape == 'round' ? 100 : 0
    }

    handleNewImage = e => {
        this.setState({image: e.target.files[0]})
    }

    handleSave = () => {
        const image = this.editor.getImageScaledToCanvas().toDataURL()
        const rect = this.editor.getCroppingRect()

        this.setState({
            preview: {
                image,
                rect,
                scale: this.state.scale,
                width: this.state.width,
                height: this.state.height,
                borderRadius: this._borderRadius,
            },
        })
    }

    handleScale = e => {
        const scale = parseFloat(e.target.value)
        this.setState({scale})
    }

    logCallback(e) {
        // eslint-disable-next-line
        console.log('callback', e)
    }

    setEditorRef = editor => {
        if (editor) this.editor = editor
    }

    handlePositionChange = position => {
        this.setState({position})
    }

    handleDrop = acceptedFiles => {
        this.setState({image: acceptedFiles[0]})
    }

    render() {
        return (
            <div>
                <Dropzone
                    onDrop={this.handleDrop}
                    disableClick
                    multiple={false}
                    style={{width: this.state.width, height: this.state.height, marginBottom: '35px'}}
                >
                    <div>
                        <AvatarEditor
                            ref={this.setEditorRef}
                            scale={this.state.scale}
                            width={this.state.width}
                            height={this.state.height}
                            position={this.state.position}
                            onPositionChange={this.handlePositionChange}
                            borderRadius={this._borderRadius}
                            onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                            onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                            onImageReady={this.logCallback.bind(this, 'onImageReady')}
                            image={this.state.image}
                            className="editor-canvas"
                        />
                    </div>
                </Dropzone>
                <br/>
                New File:
                <input name="newImage" type="file" onChange={this.handleNewImage}/>
                <br/>
                Zoom:
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={this.props.allowZoomOut ? '0.1' : '1'}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />
                <input type="button" onClick={this.handleSave} value="Preview"/>
                <br/>
                {!!this.state.preview && (
                    <img
                        src={this.state.preview.image}
                        style={{borderRadius: this._borderRadius.toString() + "%"}}
                    />
                )}
                {!!this.state.preview && (
                    <div>
                        width={
                            this.state.preview.scale < 1
                                ? this.state.preview.width
                                : this.state.preview.height * 478 / 270
                        }
                        height={this.state.preview.height}
                        image={this.state.preview.image}
                        rect={this.state.preview.rect}
                    </div>
                )}
            </div>
        )
    }
}

export default ImageCropper;
