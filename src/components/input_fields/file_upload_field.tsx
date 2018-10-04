// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import FileUpload from '../file_upload';


/**
 * The checkbox field provides these props in addition to those supported by all input fields.
 * Note that this field does not have a value prop.
 */
export interface FileUploadFieldProps extends InputFieldProps {
    /** Called when a file is selected */
    onChangeHandler?: (id: string, target: HTMLInputElement) => void;
    /** Called when a file is read. The promise should be fulfilled when the file is ready uploading. */
    onReadHandler?: (id: string, value: string) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Whether the file is being uploaded (so the upload button is disabled) **/
    uploading?: boolean;
}

/**
 * The file upload field keeps track of whether it has been touched.
 */
export interface FileUploadFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a FileUpload component.
 * TODO: merge FileUploadField and FileUpload?
 */
class FileUploadField extends React.Component<FileUploadFieldProps, FileUploadFieldState> {
    state = {
        touched: false,
    };

    static defaultProps = {
        uploading: false,
    }

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(target: HTMLInputElement): void {
        this.setState({touched: true});
        const {onChangeHandler, onReadHandler, id} = this.props;
        if (onChangeHandler) {
            onChangeHandler(id, target);
        }
        if (onReadHandler) {
            const reader = new FileReader()
            reader.onload = () => onReadHandler(id, reader.result as string);
            reader.onerror = console.error; // TODO
            reader.readAsDataURL(target.files[0]);
        }
    }

    render() {
        const {placeholder, uploading, children, ...wrapperProps} = this.props;
        const {id, staticField} = wrapperProps;
        const {touched} = this.state;
        return <InputFieldWrapper inputChildren={children} touched={touched} {...wrapperProps}>
            <FileUpload
                id={id}
                onChangeHandler={this._onChange}
                disabled={staticField}
                uploading={uploading}
                placeholder={placeholder}
            />
        </InputFieldWrapper>;
    }
}

export default FileUploadField;
