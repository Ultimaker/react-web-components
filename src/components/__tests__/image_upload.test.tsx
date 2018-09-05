// Copyright (c) 2018 Ultimaker B.V.
import 'jest';
import 'jsdom-global/register';
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

});
