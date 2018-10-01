// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import FileUploadField, {FileUploadFieldProps} from '../file_upload_field';
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
        };
        wrapper = shallow(<FileUploadField {...props} />);
    });

    it('should render a wrapper', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should render a file upload', () => {
        expect(wrapper.find(FileUpload).props()).toEqual({
            disabled: false,
            id: "testInputField",
            onChangeHandler: wrapper.instance()._onChange,
      });
    })

    it('should call the callback', async () => {
        expect(props.onChangeHandler).not.toHaveBeenCalled();

        const file = new Blob(["A+test+string+for+testing+sources"], {type: 'application/zip'});
        const input = {value: 'c/my/file.zip', files: [file]};
        wrapper.find(FileUpload).prop("onChangeHandler")(input);

        expect(props.onChangeHandler).toHaveBeenCalledWith(props.id, input);

        // wait for file to be read
        await new Promise(setImmediate);
        await new Promise(setImmediate);

        const expected = 'data:application/zip;base64,' + btoa('A+test+string+for+testing+sources');
        expect(props.onReadHandler).toHaveBeenCalledWith(props.id, expected);
        expect(wrapper.find(InputFieldWrapper).prop("touched")).toEqual(true);
    });
});
