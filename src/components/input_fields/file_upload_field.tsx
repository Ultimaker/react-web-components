import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import FileUpload from '../file_upload';


export const FileUploadField: React.StatelessComponent<InputFieldProps> = ({id, onChangeHandler, value}) =>
    console.log({value}) || <FileUpload
        id={id}
        onChangeHandler={inputElement => onChangeHandler(id, inputElement)}
        disabled={false}
    />;

FileUploadField.displayName = "FileUploadField";

export default InputFieldWrapper(FileUploadField);
