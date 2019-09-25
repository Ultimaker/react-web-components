// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';
import Spinner from './spinner';

export interface FileUploadProps {
    /** FileUpload id. Must be unique */
    id: string;
    /** Called when the file is selected is clicked */
    onChangeHandler: (value: HTMLInputElement) => void;
    /** Disables the file upload when true */
    disabled?: boolean;
    /** Whether the file is being uploaded (so the upload button is disabled) */
    uploading?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** What kinds of file extensions should be accepted client-side */
    accept?: string[];
    /** The test to be displayed on the upload button */
    buttonText: string;
}

export interface FileUploadState {
    selectedFileName: string
}

export class FileUpload extends React.Component<FileUploadProps, FileUploadState> {
    static _stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }

    state = {
        selectedFileName: null,
    }

    constructor(props) {
        super(props);
        this._onChangeHandler = this._onChangeHandler.bind(this);
    }

    _onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChangeHandler } = this.props;
        this.setState({ selectedFileName: e.target.files[0].name });
        onChangeHandler(e.target);
    }


    render(): JSX.Element {
        const {
            id, disabled, placeholder, uploading, accept, buttonText,
        } = this.props;
        const { selectedFileName } = this.state;

        const classes = classNames('file-upload', { disabled });
        const inputClasses = classNames('file-upload__input');

        return (
            <div className={classes}>
                <div className="layout layout--gutter-sm">
                    <div className="layout__item u-fill file-upload__input-container">
                        <div className={inputClasses}>{selectedFileName}</div>
                    </div>
                    <div className="layout__item u-fit">
                        <label htmlFor={id}>
                            <input
                                id={id}
                                name={id}
                                type="file"
                                onChange={this._onChangeHandler}
                                disabled={disabled}
                                placeholder={placeholder}
                                accept={accept ? accept.join(',') : null}
                            />
                            <span className={classNames('btn btn--primary', { waiting: uploading })}>
                                <span className="text">{buttonText}</span>
                                {uploading && <Spinner />}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUpload;
