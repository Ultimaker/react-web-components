// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import FileUploadField, { FileUploadFieldProps } from '../file_upload_field';
import InputFieldWrapper from '../input_field_wrapper';
import FileUpload from '../../file_upload';

describe('The file upload field component', () => {
    let props: FileUploadFieldProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testInputField',
            onChangeHandler: jest.fn(),
            onReadHandler: jest.fn(),
            labelLayoutWidth: '1/1',
            labelWidthBreakpoint: 'sm',
            staticField: false,
            placeholder: 'a text placeholder',
            uploading: false,
        };
        wrapper = shallow(<FileUploadField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a file upload', () => {
        expect(wrapper.find(FileUpload).props()).toEqual({
            onChangeHandler: wrapper.instance()._onChange,
            id: props.id,
            disabled: props.staticField,
            placeholder: props.placeholder,
            uploading: props.uploading,
        });
    });

    it('should render an empty URL', () => {
        wrapper.setProps({ value: null });
        expect(wrapper.find(FileUpload).prop('imageURL')).toBeUndefined();
    });

    it('should call the callback', async () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        const file = new Blob(['A+test+string+for+testing+sources'], { type: 'application/zip' });
        const input = { value: 'c/my/file.zip', files: [file] };
        wrapper.find(FileUpload).prop('onChangeHandler')(input);

        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, input);

        // wait for file to be read
        await new Promise(setImmediate);
        await new Promise(setImmediate);

        const expected = `data:application/zip;base64,${btoa('A+test+string+for+testing+sources')}`;
        expect(props.onReadHandler).toHaveBeenCalledWith(props.id, expected);
        expect(wrapper.find(InputFieldWrapper).prop('touched')).toEqual(true);
    });

    it('should ignore empty callbacks', async () => {
        wrapper.setProps({ onChangeHandler: null, onReadHandler: null });
        const file = new Blob(['A+test+string+for+testing+sources'], { type: 'application/zip' });
        wrapper.find(FileUpload).prop('onChangeHandler')({ value: 'c/my/file.zip', files: [file] });
        expect(props.onChangeHandler).not.toHaveBeenCalled();
        expect(props.onReadHandler).not.toHaveBeenCalled();
    });
});
