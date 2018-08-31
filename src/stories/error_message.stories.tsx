import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

// components
import ResponseError, { ErrorMessageTemplates, FieldTranslations } from '../components/response_error'

// utils
import { I18n } from '../utils/i18n'

const stories = storiesOf('Errors', module);
stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

const ERROR_CODE_TO_I18NC_TEMPLATE: ErrorMessageTemplates = {
    "fieldError": I18n.translate('error message',
        "%{field_name} was invalid: %{title}."),
    "lessThanMinimum": I18n.translate('error message',
        "%{field_name} does not have enough characters."),
    "usernameInvalid": I18n.translate('error message',
        "Username was not valid. Please use only latin characters, numbers and simple separators (single space, underline or hyphen)."),
}

const FIELD_NAME_TO_I18NC: FieldTranslations = {
    "username": I18n.translate("form field username", "Username")
}

stories.add('Translated errors', withInfo(
    'Translated errors'
)(() =>
    <div style={{ width: 500 }}>

        <ResponseError
            errorMessageTemplates={ERROR_CODE_TO_I18NC_TEMPLATE}
            fieldNames={FIELD_NAME_TO_I18NC}
            errors={[{
                id: '12345',
                code: 'randomError',
                http_status: '403',
                title: 'The server crashed hard'
            }]}
        />

        <br />

        <ResponseError
            errorMessageTemplates={ERROR_CODE_TO_I18NC_TEMPLATE}
            fieldNames={FIELD_NAME_TO_I18NC}
            errors={[{
                id: '12345',
                code: 'fieldError',
                http_status: '403',
                title: 'Field was invalid',
                detail: 'The field has an invalid value',
                meta: {
                    field_name: 'username'
                }
            }]}
        />

        <br />

        <ResponseError
            errorMessageTemplates={ERROR_CODE_TO_I18NC_TEMPLATE}
            fieldNames={FIELD_NAME_TO_I18NC}
            errors={[{
                id: '12345',
                code: 'lessThanMinimum',
                http_status: '403',
                title: 'Field was invalid',
                detail: 'The field has an invalid value',
                meta: {
                    field_name: 'username'
                }
            }]}
        />

    </div>
));
