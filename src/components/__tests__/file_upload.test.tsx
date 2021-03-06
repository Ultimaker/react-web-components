// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import { FileUpload, FileUploadProps } from '../file_upload';
import Spinner from '../spinner';

describe('The FileUpload component', () => {
    let props: FileUploadProps;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testFileUpload',
            onChangeHandler: jest.fn(),
            placeholder: 'A text placeholder',
            uploading: false,
            buttonText: 'Choose file',
        };
        wrapper = shallow(<FileUpload {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

    it('should show a spinner while uploading', () => {
        wrapper.setProps({ uploading: true });
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
});
