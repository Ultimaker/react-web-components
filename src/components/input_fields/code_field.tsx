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

    // the default props
    static defaultProps = {
        type: 'number',
    }

    // the default state
    state = {
        touched: false,
    };

    constructor(props) {
        super(props);
        // bind callbacks once
        this._change = this._change.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._isKeyAllowed = this._isKeyAllowed.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._isEmpty = this._isEmpty.bind(this);
    }

    /**
     * Focuses on the input field if required.
     * Binds the selection changed event.
     */
    componentDidMount(): void {
        const { focusOnLoad, value } = this.props;
        if (focusOnLoad) {
            // focus on the next input field to be filled in (or the 1st if all chars are filled in).
            this._focusOnPromptInput(value.length);
        }
        document.addEventListener("selectionchange", this._onSelectionChanged);
    }

    /**
     * Remove the event bindings
     */
    componentWillUnmount() {
        document.removeEventListener("selectionchange", this._onSelectionChanged);
    }

    /**
     * Handles changes to the text selection in the document.
     * Without this function, if the value of the field changes (with delete for example) we lose the selection.
     * To fix it, if the currently focused element is one of the refs in this class, we select its text.
     */
    private _onSelectionChanged() {
        const ref = this._inputRefs && this._inputRefs.find(r => r === document.activeElement);
        if (ref && ref.value.length) {
            ref.select();
        }
    }

    /**
     * Checks whether the given string value is empty, considering whether it's set to the empty character.
     * @param value - The value to be checked.
     * @return Whether the value is empty or not.
     * @private
     */
    private _isEmpty(value: string): boolean {
        return !value || value === this._emptyChar;
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
     * Checks whether the given character value is allowed on this field.
     * @param charValue - The value of the character.
     * @private
     */
    private _isKeyAllowed(charValue: string) {
        const { type } = this.props;
        const regex = {
            text: /\w/,
            number: /\d/,
            password: /[ -~]/,  // match any ascii printable characters
        }
        return this._isEmpty(charValue) || regex[type].test(charValue);
    }

    /**
     * Change the value in one of the code inputs.
     * @param index - The index of the field.
     * @param charValue - The value of the character typed.
     * @param focusOnIndex - The next input field to be selected. -1 to default it to {index}.
     * @private
     */
    private _change(index: number, charValue: string, focusOnIndex: number): void {
        const { onChangeHandler, value, maxLength, id } = this.props;

        if (!this._isKeyAllowed(charValue)) {
            return;
        }

        let newValue: string;
        if (charValue == null) {
            newValue = value.substring(0, index) + value.substring(index + 1);
        } else {
            // calculate the chars we will use, default to _emptyChar for inputs without a value
            const chars: string[] = _.range(0, maxLength).map(i => (i === index ? charValue : value[i]) || this._emptyChar);
            // now we have a string with the maximum length, remove the empty spaces in the end
            newValue = chars.join("").replace(/\s+$/g, "");
        }

        this.setState({ touched: true })
        onChangeHandler(id, newValue);
        this._focusOnPromptInput(focusOnIndex >= 0 ? focusOnIndex : index);
    }

    /**
     * Gets a function that will handle special keyboard keys.
     * @param index - The index of the field in which the key was pressed.
     * @param key - The name of the keyboard key that was pressed.
     * @return - Null if the key was special; otherwise a function that will return true if the default behavior should
     * be blocked;
     */
    private _getSpecialKeyHandler(index: number, key: string): () => boolean | null {
        const { value, type, maxLength } = this.props;
        /** a mapping of keys that should be handled. Each function returns whether the event was handled. **/
        return {
            // arrow left & right let you move between the fields
            ArrowLeft: () => this._focusOnPromptInput(index - 1),
            ArrowRight: () => this._focusOnPromptInput(index + 1),
            // arrow up / down let you increase / decrease numbers
            ArrowUp: () => type == 'number' &&
                !this._change(index, value[index] && String.fromCharCode(value[index].charCodeAt(0) + 1), -1),
            ArrowDown: () => type == 'number' &&
                !this._change(index, value[index] && String.fromCharCode(value[index].charCodeAt(0) - 1), -1),
            // home/end let you go to the beginning and end of the code.
            Home: () => this._focusOnPromptInput(0),
            End: () => this._focusOnPromptInput(maxLength - 1),
            // Backspace deletes the current item, or the previous item if the current item is empty
            Backspace: () => !this._change(this._isEmpty(value[index]) ? index - 1 : index, this._emptyChar, -1),
            // Delete removes the next input field with a value
            Delete: () => !this._change(index, null, -1),
        }[key];
    }

    /**
     * Method that handles special key presses on the code fields, allowing the user to seamlessly switch between them.
     * @param index - The index of the field.
     * @param event - The keyboard event.
     * @private
     */
    private _onKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
        let handler = this._getSpecialKeyHandler(index, event.key);
        if (handler) {
            handler() && event.preventDefault();
        } else if (event.key.length == 1) {
            this._change(index, event.key, index + 1);
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
                                    onKeyDown={e => this._onKeyDown(index, e)}
                                    placeholder={value ? null : placeholder && placeholder[index]}
                                    value={this._isEmpty(value && value[index]) ? "" : value[index]}
                                    ref={ref => this._inputRefs[index] = ref}
                                />
                            </React.Fragment>
                    )}
                </InputFieldWrapper>
            </div>
        );
    }
}

