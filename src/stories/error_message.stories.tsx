import * as React from 'react';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import styles from '@sambego/storybook-styles';
import { withInfo } from '@storybook/addon-info';
/* eslint-enable */

// components
import ResponseError from '../components/response_error';

// utils
import { I18n } from '../utils/i18n';

const stories = storiesOf('Errors', module);
stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

const ERROR_CODE_TO_I18NC_TEMPLATE = {
    fieldError: () => I18n.translate('error message',
        '%{field_name} was invalid: %{title}.'),
    lessThanMinimum: () => I18n.translate('error message',
        '%{field_name} does not have enough characters.'),
    usernameInvalid: () => I18n.translate('error message',
        'Username was not valid. Please use only latin characters, numbers and simple separators (single space, underline or hyphen).'),
};

const FIELD_NAME_TO_I18NC = {
    username: () => I18n.translate('form field username', 'Username'),
};

stories.add('Translated errors', withInfo(
    'Translated errors',
)(() => (
    <div style={{ width: 500 }}>

        <ResponseError
            errorMessageTemplates={ERROR_CODE_TO_I18NC_TEMPLATE}
            fieldNames={FIELD_NAME_TO_I18NC}
            popupHeaderText="Something went wrong at our end :("
            popupBodyText="Please describe here what you were doing that caused the error to happen. Then download the report and attach this in an email to your Ultimaker reseller."
            popupDownloadButtonText="Download"
            popupCancelButtonText="Cancel"
            errors={[{
                id: '12345',
                code: 'randomError',
                http_status: '403',
                title: 'The server crashed hard',
            }]}
        />

        <br />

        <ResponseError
            errorMessageTemplates={ERROR_CODE_TO_I18NC_TEMPLATE}
            fieldNames={FIELD_NAME_TO_I18NC}
            popupHeaderText="Something went wrong at our end :("
            popupBodyText="Please describe here what you were doing that caused the error to happen. Then download the report and attach this in an email to your Ultimaker reseller."
            popupDownloadButtonText="Download"
            popupCancelButtonText="Cancel"
            errors={[{
                id: '12345',
                code: 'fieldError',
                http_status: '403',
                title: 'Field was invalid',
                detail: 'The field has an invalid value',
                meta: {
                    field_name: 'username',
                },
            }]}
        />

        <br />

        <ResponseError
            errorMessageTemplates={ERROR_CODE_TO_I18NC_TEMPLATE}
            fieldNames={FIELD_NAME_TO_I18NC}
            popupHeaderText="Something went wrong at our end :("
            popupBodyText="Please describe here what you were doing that caused the error to happen. Then download the report and attach this in an email to your Ultimaker reseller."
            popupDownloadButtonText="Download"
            popupCancelButtonText="Cancel"
            errors={[{
                id: '12345',
                code: 'lessThanMinimum',
                http_status: '403',
                title: 'Field was invalid',
                detail: 'The field has an invalid value',
                meta: {
                    field_name: 'username',
                },
            }]}
        />

    </div>
)));
