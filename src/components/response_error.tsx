// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// utils
import { I18n } from '../utils/i18n';

// components
import { PopupPrompt } from './popup_prompt';
import Tile from './tile';


/**
 * Gets a translated message for the given error.
 * @param error - The error object to be translated.
 * @param errorMessageTemplates - The error translation templates.
 * @param fieldTranslations - The field translation templates.
 */
export const getTranslatedError = (
    error: ResponseErrorObject,
    errorMessageTemplates: { [key: string]: () => string },
    fieldTranslations: { [key: string]: () => string },
): string => {
    const params = { ...error };

    // check if we need to translate any fields
    if (params.meta) {
        Object.keys(error.meta).forEach((key) => {
            if (key === 'field_name' && fieldTranslations[params[key]]) {
                // each field translation is a function that returns a string
                params[key] = fieldTranslations[params[key]]();
            } else {
                params[key] = error.meta[key];
            }
        });
    }

    // generate the error message
    // each error message template is a function that returns a string
    const errorMessage = errorMessageTemplates[error.code]
        ? errorMessageTemplates[error.code]()
        : `${error.title} (${error.code})`;

    return I18n.interpolate(errorMessage, params);
};


export interface ResponseErrorObject {
    id: string;
    code: string;
    http_status: string; // eslint-disable-line camelcase
    title: string;
    detail?: string;
    meta?: { [key: string]: any };
}

export interface ResponseErrorProps {
    errors: ResponseErrorObject[];
    errorMessageTemplates?: { [key: string]: () => string };
    fieldNames?: { [key: string]: () => string };

    popupHeaderText: string;
    popupBodyText: string;
    popupDownloadButtonText: string;
    popupCancelButtonText: string;
}

export interface ResponseErrorState {
    userText: string;
    showPopup: boolean;
}

export class ResponseError extends React.Component<ResponseErrorProps, ResponseErrorState> {
    constructor(props) {
        super(props);
        this.state = {
            userText: null,
            showPopup: true,
        };
        this._downloadTextFile = this._downloadTextFile.bind(this);
        this._validate = this._validate.bind(this);
        this._closePopup = this._closePopup.bind(this);
    }

    private _validate(value: string): any {
        this.setState({
            userText: value,
        });
    }

    private _closePopup(): void {
        this.setState({ showPopup: false });
    }

    /**
     * Generates a downloadable text file with error details.
     */
    private _downloadTextFile(): void {
        const { errors } = this.props;
        const { userText } = this.state;

        const blob = new Blob([JSON.stringify({
            userText,
            userAgent: navigator.userAgent,
            currentPage: window.location,
            currentTime: new Date().toISOString(),
            language: navigator.language,
            errors,
        }, null, 4)], { type: 'text/plain;charset=utf-8' });

        const element = document.createElement('a');

        element.href = URL.createObjectURL(blob);
        element.download = `cura-cloud-error-${errors[0].id}.txt`;
        element.click();
        this._closePopup();
    }

    render(): JSX.Element {
        const {
            errors, errorMessageTemplates, fieldNames, popupHeaderText,
            popupBodyText, popupDownloadButtonText, popupCancelButtonText,
        } = this.props;
        const { showPopup } = this.state;
        const isServerError = errors.find((e) => parseInt(e.http_status, 10) >= 500);
        return (
            <div className="response-error">
                <Tile align="center" alert>
                    {errors.map((error) => (
                        <div className="response-error__msg" key={error.id}>
                            {getTranslatedError(error, errorMessageTemplates, fieldNames)}
                        </div>
                    ))}
                </Tile>
                {isServerError && showPopup && (
                    <PopupPrompt
                        headerText={popupHeaderText}
                        bodyText={popupBodyText}
                        primaryBtnText={popupDownloadButtonText}
                        primaryBtnAppearance="primary"
                        primaryBtnHandler={this._downloadTextFile}
                        secondaryBtnText={popupCancelButtonText}
                        secondaryBtnAppearance="quiet"
                        secondaryBtnHandler={this._closePopup}
                        inputType="textarea"
                        validationHandler={this._validate}
                    />
                )}
            </div>
        );
    }
}

export default ResponseError;
