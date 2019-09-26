// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ImageUploadField, { ImageUploadFieldProps } from '../image_upload_field';
import InputFieldWrapper from '../input_field_wrapper';
import ImageUpload from '../../image_upload';
import { Image } from '../../image';
import BoxPlaceholder from '../../box_placeholder';

describe('The image upload field component', () => {
    let props: ImageUploadFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            onChangeHandler: jest.fn(),
            onReadHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            imageSize: '100px',
            imageShape: 'round',
            value: 'http://image.ultimaker.com',
            placeholder: 'A placeholder text',
        };
        wrapper = shallow(<ImageUploadField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a static image', () => {
        wrapper.setProps({ staticField: true });
        expect(wrapper.find(ImageUpload)).toHaveLength(0);
        expect(wrapper.find(Image).props()).toEqual({
            src: props.value, size: props.imageSize, shape: props.imageShape,
        });
    });

    it('should render a placeholder', () => {
        wrapper.setProps({
            staticField: true,
            value: null,
        });
        expect(wrapper.find(Image)).toHaveLength(0);
        expect(wrapper.find(ImageUpload)).toHaveLength(0);
        expect(wrapper.find(BoxPlaceholder).props()).toEqual({
            backgroundColor: 'transparent',
            size: props.imageSize,
        });
    });

    it('should render a image upload', () => {
        expect(wrapper.find(ImageUpload).props()).toEqual({
            id: 'testInputField',
            onFileSelection: wrapper.instance()._onChange,
            onFileRead: expect.any(Function),
            size: props.imageSize,
            imageURL: props.value,
            placeholderLabel: props.placeholder,
            shape: props.imageShape,
        });
    });

    it('should call the callback', async () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        const image = new Blob(['A+test+string+for+testing+image'], { type: 'image/jpeg' });
        image['preview'] = 'blob:http://localhost:3050/a8e0fa3b-feb4-4409-ac43-8335e412189c';
        wrapper.find(ImageUpload).prop('onFileSelection')(image);

        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, image);
        const contents = `data:image/jpeg;base64,${btoa('A+test+string+for+testing+image')}`;
        wrapper.find(ImageUpload).prop('onFileRead')(contents);

        expect(props.onReadHandler).toHaveBeenCalledWith(props.id, contents);
        expect(wrapper.find(InputFieldWrapper).prop('touched')).toEqual(true);
    });

    it('should ignore empty callbacks', async () => {
        wrapper.setProps({ onChangeHandler: null, onReadHandler: null });

        wrapper.find(ImageUpload).prop('onFileSelection')(
            new Blob(['A+test+string+for+testing+image'], { type: 'image/jpeg' }),
        );

        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(props.onReadHandler).not.toHaveBeenCalled();
    });
});
