import * as React from 'react';

import Popup from './popup';
import { InputField, InputFieldType, InputFieldValue } from './input_field';
import { ButtonStyle } from './button';

export type PopupPromptType = 'confirm' | 'prompt' | 'children';

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
    /** Called when the primary button is clicked */
    primaryBtnHandler: (value: InputFieldValue) => void;
    /** Primary button style */
    primaryBtnStyle?: ButtonStyle;
    /** Secondary button text */
    secondaryBtnText?: string;
    /** Called when the secondary button is clicked */
    secondaryBtnHandler?: () => void;
    /** Secondary button style */
    secondaryBtnStyle?: ButtonStyle;
    /** Placeholder text for the input for popups of type prompt */
    promptPlaceholder?: string;
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
            this.setState({ inputValue: inputDefaultValue.toString() })
        }
    }

    _onChangeHandler(id: string, value: InputFieldValue): void {
        this.setState({ inputValue: value });
        
        if (this.props.validationHandler) {
            this.setState({ validationError: this.props.validationHandler(value) });
        }
    }

    _isInputValid(): boolean {
        const { validationHandler } = this.props;
        const { inputValue } = this.state;

        if (validationHandler && this.props.validationHandler(inputValue)) {
            this.setState({ validationError: this.props.validationHandler(inputValue) });
            return false;
        }
        else {
            return true;
        }
    }

    _primaryBtnHandler(): void {
        const { inputValue } = this.state;

        if (this._isInputValid()) {
            // only call primaryBtnHandler if there are no validation errors
            this.props.primaryBtnHandler(inputValue);
        }
    }

    render(): JSX.Element {
        const { headerText, bodyText, primaryBtnText, secondaryBtnText, promptPlaceholder, inputType,
            inputMin, inputMax, primaryBtnStyle, secondaryBtnStyle, secondaryBtnHandler } = this.props;
        const { inputValue, validationError } = this.state;

        return <Popup
            headerText={headerText}
            bodyText={bodyText}
            primaryBtnText={primaryBtnText}
            primaryBtnHandler={this._primaryBtnHandler}
            primaryBtnStyle={primaryBtnStyle}
            secondaryBtnText={secondaryBtnText}
            secondaryBtnHandler={secondaryBtnHandler}
            secondaryBtnStyle={secondaryBtnStyle}
            validationErrors={validationError ? { promptInput: validationError } : null}
        >
            <InputField
                id="promptInput"
                type={inputType}
                value={inputValue}
                min={inputMin}
                max={inputMax}
                onChangeHandler={this._onChangeHandler}
                placeholder={promptPlaceholder}
                focusOnLoad />
        </Popup>
    };
}

export default PopupPrompt;
