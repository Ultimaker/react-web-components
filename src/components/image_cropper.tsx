// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import {ImageShape} from './image';
import {debounce} from 'lodash';
import RangeSlider from './range_slider';

 // needs to be imported this way to keep jest happy
let AvatarEditor = require('react-avatar-editor');
if ('default' in AvatarEditor) {
    AvatarEditor = AvatarEditor.default;
}
let Dropzone = require('react-dropzone');
if ('default' in Dropzone) {
    Dropzone = Dropzone.default;
}

export interface ImageCropperProps {
    /** Size of the image. Include size unit **/
    size?: string;
    
    /** Shape of the image: 'round' | 'square' **/
    shape?: ImageShape;
    
    /** The minimum scale to be applied to the image. Set to 1 to forbid zooming out. **/
    minScale?: number;

    /** The maximum scale to be applied to the image. Set to 1 to forbid zooming in. **/
    maxScale?: number;

    /** How big each step will be in the scale slider **/
    scaleStep?: number;

    /** Image URL **/
    imageURL?: string;

    /** Callback for when the image is changed **/
    onImageChanged: (data: string) => any;
}

export interface ImageCropperState {
    /** The position selected by the user **/
    position: { x: number, y: number };
    /** The scale selected by the user **/
    scale: number;
}

export class ImageCropper extends React.Component<ImageCropperProps, ImageCropperState> {
    /* The default props */
    static defaultProps: ImageCropperProps = {
        shape: 'square',
        size: '200px',
        minScale: 1,
        maxScale: 2,
        scaleStep: 0.1,
        imageURL: '/images/Ultimaker-Resources.jpg', // TODO: Import file instead.
        onImageChanged: () => { throw new Error("ImageCropper.onImageChanged not given.") },
    };

    /* The default state of the image cropper */
    state: ImageCropperState = {
        position: {x: 0.5, y: 0.5},
        scale: 1,
    };

    /**
     * A reference to the editor component. Typing added manually because the @types package is incorrect.
     */
    editor: {
        getImage(): HTMLCanvasElement;
        getImageScaledToCanvas(): HTMLCanvasElement;
        getCroppingRect(): {
            x: number;
            y: number;
            width: number;
            height: number;
        }
    };

    constructor(props) {
        super(props)
        this._onImageChanged = this._onImageChanged.bind(this);
        this._onScaleChanged = this._onScaleChanged.bind(this);
        this._onPositionChanged = this._onPositionChanged.bind(this);
    }

    /**
     * Handles the image changed event. This is debounced because the image data can be pretty large and change very
     * often during zooming / scaling.
     */
    _onImageChanged = debounce(() => {
        const canvas = this.editor.getImage();
        const imageData = canvas.toDataURL();
        this.props.onImageChanged(imageData);
    }, 100);

    /**
     * Handles the changed event for the scale input.
     */
    private _onScaleChanged(scale: number): void {
        this.setState({scale});
        this._onImageChanged();
    }

    /**
     * Handles the changed event for the moving of the image.
     */
    private _onPositionChanged(position: {x: number, y: number}): void {
        this.setState({position});
        this._onImageChanged();
    }

    /**
     * The avatar editor requires an integer for size, so we assume the size is either px or rem.
     * This may need to be replaced by a more complex logic in case we need to support relative sizes.
     * @param size - The size of the image, including the unit.
     * @return The size in pixels.
     */
    private _calculateSize(size: string): number {
        const sizeScale = size.endsWith("rem") ? 10 : 1;
        return parseFloat(size) * sizeScale;
    }

    /**
     * Renders the image cropper.
     */
    render() {
        const {size, shape, minScale, maxScale, scaleStep, imageURL} = this.props;
        const {scale, position} = this.state;
        const sizePixels = this._calculateSize(size);
        return (
            <div className="image-cropper--container">
                <AvatarEditor
                    ref={editor => this.editor = editor}
                    scale={scale}
                    width={sizePixels}
                    height={sizePixels}
                    position={position}
                    onPositionChange={this._onPositionChanged}
                    borderRadius={shape == 'round' ? 100 : 0}
                    image={imageURL}
                    className="editor-canvas"
                />
                <RangeSlider
                    className="image-cropper--slider"
                    onChange={this._onScaleChanged}
                    min={minScale}
                    max={maxScale}
                    step={scaleStep}
                    value={scale}
                />
            </div>
        );
    }
}

export default ImageCropper;
