// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import { PopupPrompt } from './popup_prompt';
import Tile from './tile';

// utils
import { I18n } from '../utils/i18n';

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
                // each field translation returns a function that returns a string
                params[key] = fieldTranslations[params[key]]()
            } else {
                params[key] = error.meta[key]
            }
        });
    }

    // generate the error message
    const errorMessage = errorMessageTemplates[error.code]
        ? errorMessageTemplates[error.code]()
        : I18n.translate('error message default', 'There was a problem on the server: %{title} (code %{code})');
        
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
}

export interface ResponseErrorState {
    userText: string;
    showPopup: boolean;
}

export class ResponseError extends React.Component<ResponseErrorProps, ResponseErrorState> {
    state = {
        userText: null,
        showPopup: true,
    }

    constructor(props) {
        super(props);

        // bind callbacks once
        this._downloadTextFile = this._downloadTextFile.bind(this);
        this._validate = this._validate.bind(this);
        this._closePopup = this._closePopup.bind(this);
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
        const { errors, errorMessageTemplates, fieldNames } = this.props;
        const { showPopup } = this.state;
        const isServerError = errors.find(e => parseInt(e.http_status, 10) >= 500);
        return (
            <div className="response-error">
                <Tile align="center" alert>
                    {errors.map(error => (
                        <div className="response-error__msg" key={error.id}>
                            {getTranslatedError(error, errorMessageTemplates, fieldNames)}
                        </div>
                    ))}
                </Tile>
                {isServerError && showPopup
                    && (
                        <PopupPrompt
                            headerText={I18n.translate('error popup title', 'Something went wrong at our end :(')}
                            bodyText={I18n.translate('error popup details', 'Please describe here what you were doing that caused the error to happen. Then download the report and attach this in an email to your Ultimaker reseller.')}
                            primaryBtnText={I18n.translate('error popup send', 'Download')}
                            primaryBtnAppearance="primary"
                            primaryBtnHandler={this._downloadTextFile}
                            secondaryBtnText={I18n.translate('error popup cancel', 'Cancel')}
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
