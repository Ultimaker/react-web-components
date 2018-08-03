// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Popup from './popup';
import Tile from './tile';

// utils
import { I18n } from '../utils/i18n';

/**
 * Map of all API error codes that should be translated.
 * The variables "code", "field_name" and "title" are available here.
 */
export const ERROR_CODE_TO_I18NC_TEMPLATE = {

    // generic errors
    "genericError": "There was a problem on the server, please try again. (Code: %{code})",
    "apiResponseError": "There was a problem on the server, please try again.",

    // generic field errors
    "fieldError": "%{field_name} was invalid: %{title}.",
    "lessThanMinimum": "%{field_name} does not have enough characters.",

    // specific field errors
    "emailInvalid": "Email address was not valid. Please use only lower-case characters and a full domain name.",
    "fullNameInvalid": "Full name was not valid. Please use only latin characters, \
        numbers and simple separators (single space, underline or hyphen).",
    "usernameInvalid": "Username was not valid. Please use only latin characters, \
        numbers and simple separators (single space, underline or hyphen).",
    "passwordInvalid": "Password was not valid. Please use at least eight characters, \
        at least one number and both lower and uppercase letters and special characters.",
    "badPasswordRepeat": "Repeated password did not match original password.",
    "dataUriImageInvalid": "Profile image was not valid. Please use a JPEG or PNG image."

}

/**
 * Map of all form field names that should be translated.
 */
export const FIELD_NAME_TO_I18NC = {

    // user data
    "username": I18n.translate("form field username", "Username"),
    "email": I18n.translate("form field email", "Email Address"),
    "name": I18n.translate("form field name", "Full Name"),
    "password": I18n.translate("form field password", "Password"),
    "password_repeat": I18n.translate("form field password_repeat", "Repeat Password"),

}

/**
 * Gets a translated message per error code.
 * @param code The error code.
 * @param params The parameters to replace in the template string.
 */
export const getTranslatedError = (code: string, params: {[key: string]: string} = {}): string => {
    return I18n.format("error code", ERROR_CODE_TO_I18NC_TEMPLATE[code]
        || ERROR_CODE_TO_I18NC_TEMPLATE["genericError"], params)
}

export interface ResponseErrorMetaObject {
    field_name?: string;
    given_value?: string;
    url?: string;
}

export interface ResponseErrorObject {
    id: string;
    code: string;
    http_status: string;
    title: string;
    detail?: string;
    meta?: ResponseErrorMetaObject;
}

export interface ResponseErrorProps {
    errors: ResponseErrorObject[];
}

export interface ResponseErrorState {
    userText: string;
    showPopup: boolean;
}

export default class ResponseError extends React.Component<ResponseErrorProps, ResponseErrorState> {

    state = {
        userText: null,
        showPopup: true
    }

    constructor(props) {
        super(props);

        // bind callbacks once
        this._downloadTextFile = this._downloadTextFile.bind(this);
        this._validate = this._validate.bind(this);
        this._closePopup = this._closePopup.bind(this);
    }

    render(): JSX.Element[] {
        const { errors } = this.props;

        return errors.map((originalError: ResponseErrorObject, index) => {
            const { code, http_status, title, meta } = originalError;
            const { field_name } = meta;
            return <div key={index}>

                <Tile align="center" alert>
                    <span>{getTranslatedError(code, {
                        "code": code,
                        "field_name": FIELD_NAME_TO_I18NC[field_name],
                        "title": title
                    })}</span>
                </Tile>

                { parseInt(http_status) >= 500 && <Popup
                    isOpen={this.state.showPopup}
                    type="prompt"
                    headerText={I18n.translate("error popup title", "Something went wrong at our end :(")}
                    bodyText={I18n.translate("error popup details", "Please describe here what you were doing that caused the error to happen. \
                        Then download the report and attach this in an email to your Ultimaker reseller.")}
                    primaryBtnText={I18n.translate("error popup send", "Download")}
                    primaryBtnStyle="primary"
                    primaryBtnHandler={() => this._downloadTextFile(originalError)}
                    secondaryBtnText={I18n.translate("error popup cancel", "Cancel")}
                    secondaryBtnStyle="quiet"
                    secondaryBtnHandler={this._closePopup}
                    inputType="textarea"
                    validationHandler={this._validate}
                /> }
                
            </div>
        });
    }

    private _validate(value: string): any {
        this.state.userText = value;
    }

    private _closePopup(): void {
        this.setState({ showPopup: false });
    }

    /**
     * Generates a downloadable text file with error details.
     * @param originalError The original error object returned by the server.
     */
    private _downloadTextFile(originalError: ResponseErrorObject): void {
        const blob = new Blob([JSON.stringify({
            "userText": this.state.userText,
            "userAgent": navigator.userAgent,
            "currentPage": window.location,
            "currentTime": new Date().toISOString(),
            "language": navigator.language,
            "originalError": originalError
        }, null, 4)], { type: "text/plain;charset=utf-8"});
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.download = "cura-cloud-error-" + originalError.id + ".txt";
        element.click();
        this._closePopup();
    }
}
