import * as React from 'react';

// components
import Popup from './popup';
import { InputField, InputFieldType, InputFieldValue } from './input_field';
import { ButtonStyle } from './button';

export interface PopupPromptProps {
    /** Input type for popups of type prompt */
    inputType?: InputFieldType;
    /** Input default value for popups of type prompt */
    inputDefaultValue?: string | number;
    /** Input minimum value for popups of type prompt */
    inputMin?: number;
    /** Input max value for popups of type prompt */
    inputMax?: number;
    /** Popup header text */
    headerText: string;
    /** Popup body text */
    bodyText: string;
    /** If passed, the validationHandler is called when the primary button is clicked.
     * The primaryBtnHandler is then only called if no error message is returned. */
    validationHandler?: (value: InputFieldValue) => string;
    /** Primary button text */
    primaryBtnText: string;
    /**
     * Called when the primary button is clicked.
     * If it returns a promise, the spinner is hidden when it is done.
     */
    primaryBtnHandler: (value: InputFieldValue) => void | Promise<any>;
    /** Primary button style */
    primaryBtnStyle?: ButtonStyle;
    /** Secondary button text */
    secondaryBtnText?: string;
    /**
     * Called when the secondary button is clicked.
     * If it returns a promise, the spinner is hidden when it is done.
     */
    secondaryBtnHandler?: () => void | Promise<any>;
    /** Secondary button style */
    secondaryBtnStyle?: ButtonStyle;
    /** Placeholder text for the input for popups of type prompt */
    promptPlaceholder?: string;
    /** A component or text to be rendered in the footer of the popup */
    footer?: any;
}

export interface PopupPromptState {
    inputValue: InputFieldValue;
    validationError: string;
}

export class PopupPrompt extends React.Component<PopupPromptProps, PopupPromptState> {
    state = {
        inputValue: undefined,
        validationError: undefined,
    }

    constructor(props) {
        super(props);

        // bind callbacks once
        this._onChangeHandler = this._onChangeHandler.bind(this);
        this._primaryBtnHandler = this._primaryBtnHandler.bind(this);
    }

    componentDidMount(): void {
        const { inputDefaultValue } = this.props;

        if (inputDefaultValue) {
            // set the initial value of the prompt input field
            this.setState({ inputValue: inputDefaultValue.toString() });
        }
    }

    private _onChangeHandler(id: string, value: InputFieldValue): void {
        const { validationHandler } = this.props;
        this.setState({ inputValue: value });

        if (validationHandler) {
            this.setState({ validationError: validationHandler(value) });
        }
    }

    private _isInputValid(): boolean {
        const { validationHandler } = this.props;
        const { inputValue } = this.state;

        const validationError = validationHandler && validationHandler(inputValue);
        if (validationError) {
            this.setState({ validationError });
            return false;
        }
        return true;
    }

    private _primaryBtnHandler(): void | Promise<any> {
        const { primaryBtnHandler } = this.props;
        const { inputValue } = this.state;

        if (this._isInputValid()) {
            // only call primaryBtnHandler if there are no validation errors
            return primaryBtnHandler(inputValue);
        }
        return null;
    }

    render(): JSX.Element {
        const {
            headerText, bodyText, primaryBtnText, secondaryBtnText, promptPlaceholder, inputType,
            inputMin, inputMax, primaryBtnStyle, secondaryBtnStyle, secondaryBtnHandler, footer,
        } = this.props;
        const { inputValue, validationError } = this.state;

        return (
            <Popup
                headerText={headerText}
                bodyText={bodyText}
                primaryBtnText={primaryBtnText}
                primaryBtnHandler={this._primaryBtnHandler}
                primaryBtnStyle={primaryBtnStyle}
                secondaryBtnText={secondaryBtnText}
                secondaryBtnHandler={secondaryBtnHandler}
                secondaryBtnStyle={secondaryBtnStyle}
                validationErrors={validationError ? { promptInput: validationError } : null}
                width="sm"
                footer={footer}
            >
                <InputField
                    id="promptInput"
                    type={inputType}
                    value={inputValue}
                    min={inputMin}
                    max={inputMax}
                    onChangeHandler={this._onChangeHandler}
                    placeholder={promptPlaceholder}
                    focusOnLoad
                />
            </Popup>
        );
    }
}

export default PopupPrompt;
