// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import classNames from 'classnames';
import { I18n } from '../utils/i18n';
import Spinner from './spinner';

export interface FileUploadProps {
    /** FileUpload id. Must be unique */
    id: string;
    /** Called when the file is selected is clicked */
    onChangeHandler: (value: HTMLInputElement) => void;
    /** Disables the file upload when true */
    disabled?: boolean;
    /** Whether the file is being uploaded (so the upload button is disabled) **/
    uploading?: boolean;
    /** Placeholder text */
    placeholder?: string;
}

export interface FileUploadState {
    selectedFileName: string
}

export class FileUpload extends React.Component<FileUploadProps, FileUploadState> {

    state = {
        selectedFileName: null
    }

    constructor(props) {
        super(props);
        this._onChangeHandler = this._onChangeHandler.bind(this);
    }

    _onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ selectedFileName: e.target.files[0].name })
        this.props.onChangeHandler(e.target);
    }

    _stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
    }

    render(): JSX.Element {
        const { id, disabled, placeholder, uploading } = this.props;
        const { selectedFileName } = this.state;

        const classes = classNames('file-upload', { disabled });
        const inputClasses = classNames('file-upload__input');

        return <div className={classes} onClick={this._stopPropagation} >
            <input
                id={id}
                name={id}
                type="file"
                onChange={this._onChangeHandler}
                disabled={disabled}
                placeholder={placeholder}
            />
            <div className="layout layout--gutter-sm">
                <div className="layout__item u-fill file-upload__input-container">
                    <label className={inputClasses} htmlFor={id}>{selectedFileName}</label>
                </div>
                <div className="layout__item u-fit">
                    <label className='btn btn--primary' htmlFor={id}>
                        {I18n.translate('file upload button', 'Choose file')}
                        {/* TODO: Check with Alan which classes we need to have the spinner keep the button size */}
                        {uploading && <Spinner />}
                    </label>
                </div>
            </div>
        </div>
    }
}

export default FileUpload;
