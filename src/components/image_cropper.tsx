// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { ImageShape } from './image';
import RangeSlider from './range_slider';
import CloseButton from './close_button';

// needs to be imported this way to keep jest happy
let AvatarEditor = require('react-avatar-editor');

if ('default' in AvatarEditor) {
    /* istanbul ignore next */ // ignores coverage for this line.
    AvatarEditor = AvatarEditor.default;
}

const debounce = require('lodash.debounce');

export interface ImageCropperProps {
    /** Size of the image. Include size unit */
    size?: string;

    /** Shape of the image: 'round' | 'square' */
    shape?: ImageShape;

    /** Size of the border, in pixels */
    borderSize?: number;

    /** The minimum scale to be applied to the image. Set to 1 to forbid zooming out. */
    minScale?: number;

    /** The maximum scale to be applied to the image. Set to 1 to forbid zooming in. */
    maxScale?: number;

    /** How big each step will be in the scale slider */
    scaleStep?: number;

    /** Image URL */
    imageURL?: string;

    /** Callback for when the image is changed */
    onImageChanged: (data: string) => any;

    /** If given, the user is allowed to cancel cropping. This callback is then called. */
    onCropCancel?: () => any;
}

export interface ImageCropperState {
    /** The position selected by the user */
    position: { x: number, y: number };
    /** The scale selected by the user */
    scale: number;
}

export class ImageCropper extends React.Component<ImageCropperProps, ImageCropperState> {
    /**
     * The avatar editor requires an integer for size, so we assume the size is either px or rem.
     * This may need to be replaced by a more complex logic if we need to support relative sizes.
     * @param size - The size of the image, including the unit.
     * @param borderSize - The size of the border, in pixels.
     * @return The size in pixels.
     */
    static _calculateSize(size: string, borderSize: number): number {
        const sizeScale = size.endsWith('rem') ? 10 : 1;
        return parseFloat(size) * sizeScale - borderSize * 2;
    }

    static defaultProps: ImageCropperProps = {
        shape: 'square',
        size: '200px',
        minScale: 1,
        maxScale: 2.5,
        scaleStep: 0.1,
        borderSize: 25,
        imageURL: null,
        onImageChanged: null,
    };

    /* The default state of the image cropper */
    state: ImageCropperState = {
        position: { x: 0.5, y: 0.5 },
        scale: 1,
    };

    /**
     * Handles the image changed event. This is debounced because the image data
     * can be pretty large and change very often during zooming / scaling.
     */
    _onImageChanged = debounce(() => {
        const { onImageChanged } = this.props;
        const canvas = this._editor.getImage();
        const imageData = canvas.toDataURL();
        onImageChanged(imageData);
    }, 100);

    /**
     * A reference to the editor component.
     * Typing added manually because the @types package is incorrect.
     */
    _editor: {
        getImage(): HTMLCanvasElement;
        getImageScaledToCanvas(): HTMLCanvasElement;
        getCroppingRect(): {
            x: number;
            y: number;
            width: number;
            height: number;
        }
    };

    /**
     * Renders the image cropper.
     */
    render() {
        const {
            size, shape, minScale, maxScale, scaleStep, imageURL, onCropCancel, borderSize,
        } = this.props;
        const { scale, position } = this.state;
        const sizePixels = ImageCropper._calculateSize(size, borderSize);
        return (
            <div className="image-cropper--container">
                <AvatarEditor
                    ref={editor => this._editor = editor} // eslint-disable-line no-return-assign
                    scale={scale}
                    border={borderSize}
                    width={sizePixels}
                    height={sizePixels}
                    position={position}
                    onPositionChange={newPosition => this.setState({ position: newPosition })}
                    onImageChange={() => this._onImageChanged()}
                    borderRadius={shape === 'round' ? sizePixels : 0}
                    image={imageURL}
                    className="editor-canvas"
                />
                <RangeSlider
                    className="image-cropper--slider"
                    onChange={newScale => this.setState({ scale: newScale })}
                    min={minScale}
                    max={maxScale}
                    step={scaleStep}
                    value={scale}
                />
                {onCropCancel
                    && <CloseButton onClickHandler={onCropCancel} color="white" />
                }
            </div>
        );
    }
}

export default ImageCropper;
