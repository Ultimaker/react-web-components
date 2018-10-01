// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';
import Textarea from '../textarea';

export interface TextareaFieldProps extends InputFieldProps {
    /** The text **/
    value: string;
    /** Whether the textarea should grow horizontally with user input */
    textareaAutoGrow?: boolean;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string) => any;
    /** html placeholder text */
    placeholder?: string;
}

export interface TextareaFieldState {
    /** Indicates if the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * Class that adds an input wrapper around a Textarea component.
 * TODO: merge the two components
 */
class TextareaField extends React.Component<TextareaFieldProps, TextareaFieldState> {
    state = {
        touched: false
    }

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
    }

    private _onChange(value: string): void {
        this.setState({touched: true});
        this.props.onChangeHandler(this.props.id, value);
    }

    render() {
        const {value, textareaAutoGrow, focusOnLoad, placeholder, ...wrapperProps} = this.props;
        const {id, staticField} = wrapperProps;
        const {touched} = this.state;
        return <InputFieldWrapper touched={touched} {...wrapperProps}>{
            staticField ? value :
            <Textarea
                id={id}
                onChangeHandler={this._onChange}
                placeholder={placeholder}
                value={value}
                autofocus={focusOnLoad}
                autoGrow={textareaAutoGrow}
            />
        }</InputFieldWrapper>;
    }
}

export default TextareaField;
