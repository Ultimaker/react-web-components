// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// utils
import { I18n } from '../utils/i18n';

// components
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

    popupHeaderText: string;            // Deprecated
    popupBodyText: string;              // Deprecated
    popupDownloadButtonText: string;    // Deprecated
    popupCancelButtonText: string;      // Deprecated
}

export class ResponseError extends React.Component<ResponseErrorProps, {}> {

    render(): JSX.Element {
        const {
            errors, errorMessageTemplates, fieldNames
        } = this.props;

        return (
            <div className="response-error">
                <Tile align="center" alert>
                    {errors.map((error) => (
                        <div className="response-error__msg" key={error.id}>
                            {getTranslatedError(error, errorMessageTemplates, fieldNames)}
                        </div>
                    ))}
                </Tile>
            </div>
        );
    }
}

export default ResponseError;
