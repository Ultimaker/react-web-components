// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import FileUpload from '../file_upload';


interface FileUploadFieldProps extends InputFieldProps {
    /** Called when a file is selected */
    onChangeHandler: (id: string, target: HTMLInputElement) => void;
    /** Called when a file is read */
    onReadHandler: (id: string, value: string) => Promise<any>;
}

export interface FileUploadFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a FileUpload component.
 * TODO: merge the two components
 */
class FileUploadField extends React.Component<FileUploadFieldProps, FileUploadFieldState> {
    state = {
        touched: false
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
            reader.onload = () => onReadHandler(id, reader.result as string)
            reader.onerror = console.error // TODO
            reader.readAsDataURL(target.files[0])
        }
    }

    render() {
        const {...wrapperProps} = this.props;
        const {id} = wrapperProps;
        const {touched} = this.state;
        return <InputFieldWrapper touched={touched} {...wrapperProps}>
            <FileUpload
                id={id}
                onChangeHandler={this._onChange}
                disabled={false}
            />
        </InputFieldWrapper>
    }
}

export default FileUploadField;
