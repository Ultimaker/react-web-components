// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ImageCropper, {AvatarEditor} from '../image_cropper';
import RangeSlider from '../range_slider';

describe('The Image Cropper component', () => {
    let wrapper;
    const onImageChanged = jest.fn();
    const onCropCancel = jest.fn();
    const editor = { getImage: () => ({ toDataURL: () => "imageData" }) };

    beforeEach(() => {
        onImageChanged.mockReset();
        onCropCancel.mockReset();
        wrapper = shallow(<ImageCropper onImageChanged={onImageChanged} />);
        wrapper.instance()._editor = editor;
    })

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(onImageChanged).not.toHaveBeenCalled();
        expect(onCropCancel).not.toHaveBeenCalled();
    })

    it('should parse the callback', async () => {
        wrapper.find(RangeSlider).prop('onChange')(0.5);
        const avatarProps: any = wrapper.find(AvatarEditor).props();
        avatarProps.onPositionChange({x: 0, y: 1});
        avatarProps.onImageChange();
        wrapper.instance()._onImageChanged.flush()

        expect(onImageChanged).toHaveBeenCalledWith("imageData");
        expect(onCropCancel).not.toHaveBeenCalled();
    });
});
