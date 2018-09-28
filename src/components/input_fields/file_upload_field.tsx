import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'
import FileUpload from '../file_upload'


export const FileUploadField: React.StatelessComponent<InputFieldProps> = ({}) => <div />;

FileUploadField.displayName = "FileUploadField";

        private _renderFileUpload() {
            const {id, onChangeHandler, staticField} = this.props;

            return <FileUpload
                id={id}
                onChangeHandler={onChangeHandler}
                disabled={staticField}
            />
        }

export default InputFieldWrapper(FileUploadField);
