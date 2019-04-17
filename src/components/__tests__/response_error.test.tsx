// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { shallow } from 'enzyme';

// utils
import { I18n } from '../../utils/i18n';

// component
import { ResponseError, ResponseErrorProps } from '../response_error';

const ERROR_CODE_TO_I18NC_TEMPLATE = {
    fieldError: () => I18n.translate('error message', '%{field_name} was invalid: %{title}.'),
};

const FIELD_NAME_TO_I18NC = {
    username: () => I18n.translate('form field username', 'Username'),
};

describe('The ResponseError component', () => {
    let props: ResponseErrorProps;
    let wrapper;

    beforeEach(() => {
        props = {
            errorMessageTemplates: ERROR_CODE_TO_I18NC_TEMPLATE,
            fieldNames: FIELD_NAME_TO_I18NC,
            popupHeaderText: 'Something went wrong at our end :(',
            popupBodyText: 'Please describe here what you were doing that caused the error to happen. Then download the report and attach this in an email to your Ultimaker reseller.',
            popupDownloadButtonText: 'Download',
            popupCancelButtonText: 'Cancel',
            errors: [{
                id: '12345',
                code: 'randomError',
                http_status: '403',
                title: 'The server crashed hard',
            }],
        };
        wrapper = shallow(<ResponseError {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render translated error message', () => {
        wrapper.setProps({
            errors: [{
                id: '12345',
                code: 'fieldError',
                title: 'Field was invalid',
                detail: 'The field has an invalid value',
                meta: {
                    field_name: 'username',
                },
            }],
        });
        expect(wrapper.find('.response-error__msg')).toHaveLength(1);
        expect(wrapper.find('.response-error__msg').text()).toBe('username was invalid: Field was invalid.');
    });
});
