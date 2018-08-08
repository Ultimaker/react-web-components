// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Popup from './popup';
import Tile from './tile';

// utils
import { I18n } from '../utils/i18n';

// a mapping of error codes to translated error messages which may include the error parameters as replacement keys
export type ErrorMessageTemplates = {[key: string]: string};

// a mapping of field names to translated versions
export type FieldTranslations = {[key: string]: string};

/**
 * Gets a translated message for the given error.
 * @param error - The error object to be translated.
 * @param errorMessageTemplates - The error translation templates.
 * @param fieldTranslations - The field translation templates.
 */
export const getTranslatedError = (
    error: ResponseErrorObject,
    errorMessageTemplates: ErrorMessageTemplates,
    fieldTranslations: FieldTranslations
): any[] => {
    let params = { ...error }
    if (params.meta) {
        Object.keys(error.meta).forEach(key => {
            params[key] = (key === "field_name" && fieldTranslations[params[key]]) || error.meta[key]
        });
    }
    const errorMessage = errorMessageTemplates[error.code] || I18n.translate('error message default',
        "There was a problem on the server: %{title} (code %{code})")
    return I18n.interpolate(errorMessage, params)
}

export interface ResponseErrorObject {
    id: string;
    code: string;
    http_status: string;
    title: string;
    detail?: string;
    meta?: {[key: string]: any};
}

export interface ResponseErrorProps {
    errors: ResponseErrorObject[];
    linkTo?: string;
    linkText?: string;
    errorMessageTemplates?: ErrorMessageTemplates;
    fieldNames?: FieldTranslations;
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

    render(): JSX.Element {
        const { errors, errorMessageTemplates, fieldNames } = this.props;
        const isServerError = errors.find(e => parseInt(e.http_status) >= 500)
        return (
            <div className="response-error">
                <Tile align="center" alert>
                    {errors.map(error =>
                        <div key={error.id}>{getTranslatedError(error, errorMessageTemplates, fieldNames)}</div>
                    )}
                </Tile>
                { isServerError && <Popup
                    isOpen={this.state.showPopup}
                    type="prompt"
                    headerText={I18n.translate("error popup title", "Something went wrong at our end :(")}
                    bodyText={I18n.translate("error popup details",
                        "Please describe here what you were doing that caused the error to happen. " +
                        "Then download the report and attach this in an email to your Ultimaker reseller.")}
                    primaryBtnText={I18n.translate("error popup send", "Download")}
                    primaryBtnStyle="primary"
                    primaryBtnHandler={this._downloadTextFile}
                    secondaryBtnText={I18n.translate("error popup cancel", "Cancel")}
                    secondaryBtnStyle="quiet"
                    secondaryBtnHandler={this._closePopup}
                    inputType="textarea"
                    validationHandler={this._validate}
                /> }
            </div>
        )
    }

    private _validate(value: string): any {
        this.state.userText = value;
    }

    private _closePopup(): void {
        this.setState({ showPopup: false });
    }

    /**
     * Generates a downloadable text file with error details.
     */
    private _downloadTextFile(): void {
        const blob = new Blob([JSON.stringify({
            "userText": this.state.userText,
            "userAgent": navigator.userAgent,
            "currentPage": window.location,
            "currentTime": new Date().toISOString(),
            "language": navigator.language,
            "errors": this.props.errors
        }, null, 4)], { type: "text/plain;charset=utf-8"});
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.download = "cura-cloud-error-" + this.props.errors[0].id + ".txt";
        element.click();
        this._closePopup();
    }
}
