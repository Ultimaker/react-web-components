// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import _ = require('lodash');
import classNames from 'classnames';

// components
import InputFieldWrapper, {InputFieldProps} from './input_field_wrapper';

/**
 * The props of the code field.
 */
export interface CodeFieldProps extends InputFieldProps {
    /** Input field value */
    value: string | null;
    /** Amount of characters required in the field **/
    maxLength: number;
    /** Called when the field changes */
    onChangeHandler: (id: string, value: string) => any;
    /** If true, the field will be focused when loaded */
    focusOnLoad?: boolean;
    /** Optional html placeholder text */
    placeholder?: string;
    /** Optional extra elements to be displayed after the input **/
    children?: any;
    /** Optional type of the input elements **/
    type?: "text" | "password" | "number";
}

/**
 * The state of the code field.
 */
export interface CodeFieldState {
    /** Indicates whether the field has been touched (changed) or not from the default value. */
    touched: boolean;
}

/**
 * The code field is a text field that includes {maxLength} single-letter password inputs.
 */
export default class CodeField extends React.Component<CodeFieldProps, CodeFieldState> {

    // references to the input fields to focus on them
    private readonly _inputRefs: HTMLInputElement[] = [];

    // if the user wrote one of the later characters but not earlier ones, we add this character as filler
    private readonly _emptyChar: string = "\t";

    state = {
        touched: false,
    };

    constructor(props) {
        super(props);
        // bind callbacks once
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._isEmpty = this._isEmpty.bind(this);
    }

    /**
     * Focuses on the input field if required.
     */
    componentDidMount(): void {
        const { focusOnLoad, value } = this.props;
        if (focusOnLoad) {
            // focus on the next input field to be filled in (or the 1st if all chars are filled in).
            this._focusOnPromptInput(value.length);
        }
    }

    /**
     * Checks whether the given string value is empty, considering whether it's set to the empty character.
     * @param index - The value to be checked.
     * @return Whether the value is empty or not.
     * @private
     */
    private _isEmpty(index: number): boolean {
        const { value } = this.props;
        return !value || !value[index] || value[index] == this._emptyChar;
    }

    /**
     * Sets the keyboard focus on the input with the given index (if found).
     * @param index - The index of the field to be focused.
     * @return Whether the input field was found or not.
     * @private
     */
    private _focusOnPromptInput(index: number): boolean {
        const ref = this._inputRefs[index];
        if (!ref) {
            return false;
        }
        ref.focus();
        ref.select();
        return true;
    }

    /**
     * Handles the change of value in one of the code inputs.
     * @param index - The index of the field.
     * @param charValue - The value of the character typed.
     * @private
     */
    private _onChange(index: number, charValue: string): void {
        const { onChangeHandler, value, type, maxLength, id } = this.props;

        // only allow digits to be added when the type is number
        if (type === 'number' && (charValue < "0" || charValue > "9")) {
            charValue = null;
        }

        // calculate the chars we will use, default to _emptyChar for inputs without a value
        const chars: string[] = _.range(0, maxLength).map(i => (i === index ? charValue : value[i]) || this._emptyChar);
        // now we have a string with the maximum length, remove the empty spaces in the end
        const newValue: string = chars.join("").replace(/\s+$/g, "");

        this.setState({ touched: true });
        onChangeHandler(id, newValue);
        if (charValue) {
            // put focus on the next input
            this._focusOnPromptInput(index + 1);
        }
    }

    /**
     * Method that handles special key presses on the code fields, allowing the user to seamlessly switch between them.
     * @param index - The index of the field.
     * @param event - The keyboard event.
     * @private
     */
    private _onKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
        const { value, maxLength } = this.props;

        /** a mapping of keys that should be handled. Each function returns whether the event was handled. **/
        const keyHandlers: {[key: string]: () => boolean} = {
            ArrowLeft: () => this._focusOnPromptInput(index - 1),
            ArrowRight: () => this._focusOnPromptInput(index + 1),
            Home: () => this._focusOnPromptInput(0),
            End: () => this._focusOnPromptInput(maxLength - 1),
            Backspace: () => this._isEmpty(index) && !this._focusOnPromptInput(index - 1),
            Delete: () => {
                if (this._isEmpty(index)) {
                    // we search for the next input field with a value
                    const charsAfter: string[] = Array.from(value.substring(index + 1));
                    const deleteIndex: number = charsAfter.findIndex((_, i) => !this._isEmpty(index + i + 1));
                    if (deleteIndex >= 0) {
                        this._onChange(deleteIndex + index + 1, null);
                        return true;
                    }
                }
            },
        }

        let handler = keyHandlers[event.key];
        if (event.key === value[index]) {
            // Typed the same value in the field again, so onChange not triggered. Let's go to the next field anyway.
            handler = keyHandlers.ArrowRight;
        }
        if (handler && handler()) {
            // event handled, lets prevent the default
            event.preventDefault();
        }
    }

    /**
     * Renders the code field.
     */
    render() {
        const { value, maxLength, placeholder, type, children, ...wrapperProps } = this.props;
        const { touched } = this.state;
        const { staticField, id, submitted, validationError } = wrapperProps;
        const className = classNames('input', {'error': validationError && (touched || submitted)});

        return (
            <div className="code-field" id={id}>
                <InputFieldWrapper touched={touched} inputChildren={children} {...wrapperProps}>
                    {staticField ? (type === "password" ? _.repeat('*', maxLength) : value) :
                        _.range(0, maxLength).map(index =>
                            <React.Fragment key={index}>
                                {index > 0 && <span className="separator">-</span>}
                                <input
                                    id={id + "__" + index.toString()}
                                    className={className}
                                    name={id}
                                    type={type}
                                    maxLength={1}
                                    onChange={e => this._onChange(index, e.target.value)}
                                    onKeyDown={e => this._onKeyDown(index, e)}
                                    placeholder={value ? null : placeholder && placeholder[index]}
                                    value={this._isEmpty(index) ? "" : value[index]}
                                    ref={ref => this._inputRefs[index] = ref}
                                />
                            </React.Fragment>
                    )}
                </InputFieldWrapper>
            </div>
        );
    }
}
