// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// component
import FileUpload from '../file_upload';

describe('The FileUpload component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            id: 'testFileUpload',
            onChangeHandler: jest.fn(),
        };
        wrapper = shallow(<FileUpload {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(props.onChangeHandler).not.toHaveBeenCalled();
    });

});
