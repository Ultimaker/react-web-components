import * as React from 'react';
import * as AvatarEditor from 'react-avatar-editor';
let Dropzone = require('react-dropzone'); // needs to be imported this way to keep jest happy
if ('default' in Dropzone) {
    Dropzone = Dropzone.default;
}

export interface ImageCropperProps {

}

export interface ImageCropperState {
    image: string;
    allowZoomOut: boolean;
    position: { x: number, y: number };
    scale: number;
    rotate: number;
    borderRadius: number;
    preview: {
        rect: {
          width: number,
          height: number,
        },
        image: string,
        width: number,
        height: number,
    };
    width: number;
    height: number;
}

export class ImageCropper extends React.Component<ImageCropperProps, ImageCropperState> {
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

    state = {
        image: 'https://react-avatar-editor.netlify.com/avatar.jpg',
        allowZoomOut: false,
        position: {x: 0.5, y: 0.5},
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 200,
        height: 200,
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
                borderRadius: this.state.borderRadius,
            },
        })
    }

    handleScale = e => {
        const scale = parseFloat(e.target.value)
        this.setState({scale})
    }

    handleAllowZoomOut = ({target: {checked: allowZoomOut}}) => {
        this.setState({allowZoomOut})
    }

    rotateLeft = e => {
        e.preventDefault()

        this.setState({
            rotate: this.state.rotate - 90,
        })
    }

    rotateRight = e => {
        e.preventDefault()
        this.setState({
            rotate: this.state.rotate + 90,
        })
    }

    handleBorderRadius = e => {
        const borderRadius = parseInt(e.target.value)
        this.setState({borderRadius})
    }

    handleXPosition = e => {
        const x = parseFloat(e.target.value)
        this.setState({position: {...this.state.position, x}})
    }

    handleYPosition = e => {
        const y = parseFloat(e.target.value)
        this.setState({position: {...this.state.position, y}})
    }

    handleWidth = e => {
        const width = parseInt(e.target.value)
        this.setState({width})
    }

    handleHeight = e => {
        const height = parseInt(e.target.value)
        this.setState({height})
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
                            rotate={this.state.rotate}
                            borderRadius={this.state.width / (100 / this.state.borderRadius)}
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
                    min={this.state.allowZoomOut ? '0.1' : '1'}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />
                <br/>
                {'Allow Scale < 1'}
                <input
                    name="allowZoomOut"
                    type="checkbox"
                    onChange={this.handleAllowZoomOut}
                    checked={this.state.allowZoomOut}
                />
                <br/>
                Border radius:
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleBorderRadius}
                    min="0"
                    max="50"
                    step="1"
                    defaultValue="0"
                />
                <br/>
                Avatar Width:
                <input
                    name="width"
                    type="number"
                    onChange={this.handleWidth}
                    min="50"
                    max="400"
                    step="10"
                    value={this.state.width}
                />
                <br/>
                Avatar Height:
                <input
                    name="height"
                    type="number"
                    onChange={this.handleHeight}
                    min="50"
                    max="400"
                    step="10"
                    value={this.state.height}
                />
                <br/>
                X Position:
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleXPosition}
                    min="0"
                    max="1"
                    step="0.01"
                    value={this.state.position.x}
                />
                <br/>
                Y Position:
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleYPosition}
                    min="0"
                    max="1"
                    step="0.01"
                    value={this.state.position.y}
                />
                <br/>
                Rotate:
                <button onClick={this.rotateLeft}>Left</button>
                <button onClick={this.rotateRight}>Right</button>
                <br/>
                <br/>
                <input type="button" onClick={this.handleSave} value="Preview"/>
                <br/>
                {!!this.state.preview && (
                    <img
                        src={this.state.preview.img}
                        style={{
                            borderRadius: `${(Math.min(
                                this.state.preview.height,
                                this.state.preview.width
                                ) +
                                10) *
                            (this.state.preview.borderRadius / 2 / 100)}px`,
                        }}
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
