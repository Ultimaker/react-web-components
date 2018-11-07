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
    /** Amount of characters in the field **/
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
    /** The values within each of the input fields **/
    values: string[];
}

/**
 * The code field is a text field that includes {maxLength} single-letter password inputs.
 */
export default class CodeField extends React.Component<CodeFieldProps, CodeFieldState> {

    /**
     * References to the input fields to focus on them.
     * Note that we don't use React.CreateRef because that would require some extra code for re-initializing the array
     * whenever {maxLength} changes.
     **/
    private readonly _inputRefs: HTMLInputElement[] = [];

    /** if the user wrote one of the later characters but not earlier ones, we add this character as filler **/
    private static readonly _emptyChar: string = "\t";

    /** The default props **/
    static defaultProps = {
        type: 'number',
    };

    /** The default state **/
    state = {
        touched: false,
        values: [],
    };

    constructor(props) {
        super(props);
        // bind callbacks once
        this._changeValue = this._changeValue.bind(this);
        this._changeValue = this._changeValue.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._isKeyAllowed = this._isKeyAllowed.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onPaste = this._onPaste.bind(this);
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
        document.addEventListener('selectionchange', this._onSelectionChanged);
    }

    /**
     * Remove the event bindings
     */
    componentWillUnmount() {
        document.removeEventListener('selectionchange', this._onSelectionChanged);
    }

    /**
     * Splits the value passed in the props into the separate values for each of the input fields.
     */
    static getDerivedStateFromProps(props: CodeFieldProps) {
        const { value, maxLength } = props;
        const valueStr = value || "";
        // we use space values to hide
        return {
            values: _.range(0, maxLength).map(i =>
                valueStr[i] === CodeField._emptyChar ? '' : valueStr[i] || ''
            ),
        };
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
        return !charValue || regex[type].test(charValue);
    }

    /**
     * Actually changes the value of of the code inputs.
     * @param index - The index of the field.
     * @param charValue - The value of the character typed. Empty string is fine. Null will completely remove the value.
     * @param focusOnIndex - The next input field to be selected. -1 to default it to {index}.
     * @return - Whether the change was successful.
     */
    private _changeValue(index: number, charValue: string, focusOnIndex: number): boolean {
        const { onChangeHandler, id } = this.props;
        const { values } = this.state;

        if (values[index] === charValue) {
            return true;
        } else if (!this._isKeyAllowed(charValue)) {
            return false;
        }

        if (charValue === null) {
            // charValue null, remove the character completely, add one to the end to make sure the length is OK.
            values.splice(index, 1);
            values.push('');
        } else {
            values[index] = charValue;
        }

        // Default chars to _emptyChar, remove the empty spaces in the end
        const newValue: string = values.map(v => v || CodeField._emptyChar).join("").replace(/\s+$/g, "");
        onChangeHandler(id, newValue);

        this.setState({ touched: true, values });
        this._focusOnPromptInput(focusOnIndex >= 0 ? focusOnIndex : index);
        return true;
    }

    /**
     * Gets a function that will handle special keyboard keys.
     * @param index - The index of the field in which the key was pressed.
     * @param key - The name of the keyboard key that was pressed.
     * @return - Null if the key was special; otherwise a function that will return true if the default behavior should
     * be blocked;
     */
    private _getSpecialKeyHandler(index: number, key: string): () => boolean | null {
        const { type, maxLength } = this.props;
        const { values } = this.state;
        /** a mapping of keys that should be handled. Each function returns whether the event was handled. **/
        return {
            // arrow left & right let you move between the fields
            ArrowLeft: () => this._focusOnPromptInput(index - 1),
            ArrowRight: () => this._focusOnPromptInput(index + 1),
            // arrow up / down let you increase / decrease numbers
            ArrowUp: () => type == 'number' &&
                this._changeValue(index, values[index] && ((parseInt(values[index]) + 1) % 10).toString(), -1),
            ArrowDown: () => type == 'number' &&
                this._changeValue(index, values[index] && ((parseInt(values[index]) + 9) % 10).toString(), -1),
            // home/end let you go to the beginning and end of the code.
            Home: () => this._focusOnPromptInput(0),
            End: () => this._focusOnPromptInput(maxLength - 1),
            // Backspace deletes the current item, or the previous item if the current item is empty
            Backspace: () => this._changeValue(values[index] ? index : index - 1, '', -1),
            // Delete removes the next input field with a value
            Delete: () => this._changeValue(index, null, -1),
        }[key];
    }

    /**
     * Method that handles special key presses on the code fields, allowing the user to seamlessly switch between them.
     * @param index - The index of the field.
     * @param event - The keyboard event.
     */
    private _onKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
        let handler = this._getSpecialKeyHandler(index, event.key);
        if (handler) {
            handler() && event.preventDefault();
        } else if (event.key.length == 1 && !event.ctrlKey) {
            // call the onchange manually, prevent the default
            this._changeValue(index, event.key, index + 1);
            event.preventDefault();
        }
    }

    /**
     * Handles the change event on one of the fields.
     * This generally doesn't get called because the changes are handled and stopped during onKeyDown.
     * @param index - The index of the field.
     * @param event - The change event.
     */
    private _onChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        this._changeValue(index, event.target.value, index + 1);
        event.preventDefault();
    }

    /**
     * Handles the on paste event, ignoring non-accepted stuff and pasting valid values.
     * @param index - The index of the field.
     * @param event - The clipboard event.
     */
    private _onPaste(index: number, event: React.ClipboardEvent<HTMLInputElement>) {
        const text = event.clipboardData.getData('Text');
        Array.from(text || "").forEach(char => {
            if (this._changeValue(index, char, index + 1)) {
                index += 1;
            }
        });
        event.preventDefault();
    }

    /**
     * Renders the code field.
     */
    render() {
        const { value, maxLength, placeholder, type, children, ...wrapperProps } = this.props;
        const { touched, values } = this.state;
        const { staticField, id, submitted, validationError } = wrapperProps;
        const className = classNames('input', {'error': validationError && (touched || submitted)});

        return (
            <div className="code-field" id={id}>
                <InputFieldWrapper touched={touched} inputChildren={children} {...wrapperProps}>
                    {staticField ? (type === "password" ? _.repeat('*', maxLength) : value) :
                        values.map((v, i) =>
                            <React.Fragment key={i}>
                                {i > 0 && <span className="separator">-</span>}
                                <input
                                    id={id + "__" + i.toString()}
                                    className={className}
                                    name={id}
                                    type={type}
                                    maxLength={1}
                                    onKeyDown={e => this._onKeyDown(i, e)}
                                    onChange={e => this._onChange(i, e)}
                                    onPaste={e => this._onPaste(i, e)}
                                    placeholder={value ? null : placeholder && placeholder[i]}
                                    value={v}
                                    ref={ref => this._inputRefs[i] = ref}
                                />
                            </React.Fragment>
                    )}
                </InputFieldWrapper>
            </div>
        );
    }
}

