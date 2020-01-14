// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
import AvatarEditor from 'react-avatar-editor';
import RangeSlider from '../range_slider';
import ImageCropper from '../image_cropper';

describe('The Image Cropper component', () => {
    let props;
    const onImageChanged = jest.fn();
    const onCropCancel = jest.fn();
    const mockEditor = { getImageScaledToCanvas: () => ({ toDataURL: () => 'imageData' }) };

    beforeEach(() => {
        onImageChanged.mockReset();
        onCropCancel.mockReset();
        props = {
            onImageChanged,
            onCropCancel,
        };
    });

    const createWrapper = () => {
        const wrapper = shallow(<ImageCropper {...props} />);
        // @ts-ignore
        wrapper.instance()._editor = mockEditor;
        return wrapper;
    };

    it('should render', () => {
        const wrapper = createWrapper();
        expect(wrapper).toMatchSnapshot();
        expect(onImageChanged).not.toHaveBeenCalled();
        expect(onCropCancel).not.toHaveBeenCalled();
    });

    it('should give the avatar a border radius', async () => {
        props.shape = 'round';
        props.size = '18rem';
        props.borderSize = 20;
        const wrapper = createWrapper();
        expect(wrapper.find(AvatarEditor).props()).toEqual(expect.objectContaining({
            width: 140,
            height: 140,
            border: 20,
            borderRadius: 140,
        }));
    });

    it('should keep the range slider', async () => {
        const wrapper = createWrapper();
        expect(wrapper.find(RangeSlider).prop('value')).toEqual(1);
        expect(wrapper.find(AvatarEditor).prop('scale')).toEqual(1);
        wrapper.find(RangeSlider).prop('onChange')(0.5);
        expect(wrapper.find(RangeSlider).prop('value')).toEqual(0.5);
        expect(wrapper.find(AvatarEditor).prop('scale')).toEqual(0.5);
    });

    it('should keep the image position', async () => {
        const wrapper = createWrapper();
        const avatarProps: any = wrapper.find(AvatarEditor).props();
        expect(avatarProps.position).toEqual({ x: 0.5, y: 0.5 });
        avatarProps.onPositionChange({ x: 0, y: 1 });
        expect(wrapper.find(AvatarEditor).prop('position')).toEqual({ x: 0, y: 1 });
    });

    it('should parse the callback', async () => {
        const wrapper = createWrapper();
        const avatarProps: any = wrapper.find(AvatarEditor).props();
        avatarProps.onImageChange();
        // @ts-ignore
        wrapper.instance()._onImageChanged.flush();
        expect(onImageChanged).toHaveBeenCalledWith('imageData');
        expect(onCropCancel).not.toHaveBeenCalled();
    });
});
