// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import ImageUpload from '../image_upload';

describe('The ImageFile component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            onFileSelection: jest.fn(),
        };
        wrapper = shallow(<ImageUpload {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onFileSelection).not.toHaveBeenCalled();
    });

    it('should handle dropping a file', () => {
        wrapper.instance()._onDropHandler(['file']);
        expect(wrapper.state('dropActive')).toBe(false);
        expect(props.onFileSelection).toHaveBeenCalledWith('file');
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

});
