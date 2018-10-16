// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';
let Dropzone = require('react-dropzone');
if ('default' in Dropzone) {
    Dropzone = Dropzone.default;
}

// component
import ImageUpload from '../image_upload';
import ImageCropper from '../image_cropper';
import { Image } from '../image';

describe('The image upload component', () => {
    let props;
    let wrapper;
    let image;

    beforeEach(() => {
        image = new Blob(["A+test+string+for+testing+image"], {type: 'image/jpeg'});
        image['preview'] = 'blob:http://localhost:3050/a8e0fa3b-feb4-4409-ac43-8335e412189c';

        props = {
            onFileSelection: jest.fn(),
            onFileRead: jest.fn(),
        };
        wrapper = shallow(<ImageUpload {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onFileSelection).not.toHaveBeenCalled();
    });

    it('should handle dropping a file', async () => {
        expect(props.onFileSelection).not.toHaveBeenCalled();

        wrapper.find(Dropzone).prop('onDrop')([image]);

        expect(props.onFileSelection).toHaveBeenCalledWith(image);

        // wait for image to be read
        await new Promise(setImmediate);
        await new Promise(setImmediate);

        const expected = 'data:image/jpeg;base64,' + btoa('A+test+string+for+testing+image');
        expect(props.onFileRead).toHaveBeenCalledWith(expected);
    });

    it('should handle drag enter', () => {
        wrapper.instance()._onDragEnter();
        expect(wrapper.state('dropActive')).toBe(true);
    });

    it('should handle drag leave', () => {
        wrapper.setState({ dropActive: true });
        wrapper.instance()._onDragLeave();
        expect(wrapper.state('dropActive')).toBe(false);
        expect(props.onFileSelection).not.toHaveBeenCalled();
    });

    it('should display the placeholder', () => {
        wrapper.setProps({ placeholderLabel: 'Upload your image' });
        expect(wrapper.find('.placeholder-label').text()).toEqual('Upload your image');
    });

    it('should display the image', () => {
        wrapper.setProps({ imageURL: 'a/image/url' });
        expect(wrapper.find(Image).prop('src')).toEqual('a/image/url');
        expect(wrapper.find('.cover')).toHaveLength(1);
    });

    it('should ignore empty callbacks', () => {
        wrapper.setProps({onFileSelection: null, onFileRead: null})
        wrapper.find(Dropzone).prop("onDrop")([image]);
        expect(props.onFileSelection).not.toHaveBeenCalled();
        expect(props.onFileRead).not.toHaveBeenCalled();
    });

    it('should allow for cropping', () => {
        wrapper.setProps({allowCropping: true});
        expect(wrapper.find(Dropzone)).toHaveLength(1);
        expect(wrapper.find(ImageCropper)).toHaveLength(0);
        wrapper.find(Dropzone).prop('onDrop')([image]);

        expect(wrapper.find(Dropzone)).toHaveLength(0);

        expect(wrapper.find(ImageCropper).props()).toEqual(expect.objectContaining({
            onImageChanged: props.onFileRead,
            imageURL: image.preview,
            onCropCancel: expect.any(Function),
        }));

        wrapper.find(ImageCropper).prop('onCropCancel')()
        expect(wrapper.find(Dropzone)).toHaveLength(1);
        expect(wrapper.find(ImageCropper)).toHaveLength(0);
    });
});
