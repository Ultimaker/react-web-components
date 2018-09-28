import * as React from 'react'
import classNames from 'classnames'

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper'


export interface TextFieldProps extends  InputFieldProps {
    type: 'text' | 'password' | 'email' | 'url';
}

        private _renderStaticUrl() {
            const {value} = this.props;
            return <a href={value.toString()} target="_blank">{value}</a>
        }

        private _renderStaticEmail() {
            const {value} = this.props;
            return <a href={`mailto:${value}`} target="_top">{value}</a>
        }

const TextField: React.StatelessComponent<TextFieldProps> = ({
    id, type, min, max, placeholder, value, showValidationError, onChangeHandler, inputRef
}) =>
    <input
        id={id}
        className={classNames('input', {'error': showValidationError})}
        name={id}
        type={type}
        onChange={(e) => onChangeHandler(id, e.target.value)}
        placeholder={placeholder}
        value={value != null ? value.toString() : ''}
        ref={inputRef}
    />

TextField.displayName = "TextField";

export default InputFieldWrapper(TextField)
