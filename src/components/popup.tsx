import * as React from 'react';

import splitTextByNewLine from '../utils/split_text_by_new_line';
import Modal from './modal';
import { Form, FormValidationResponse } from './form';
import { ButtonStyle } from './button';

export type PopupType = 'confirm' | 'prompt' | 'children';

export interface PopupProps {
    /** Popup header text */
    headerText: string;
    /** Popup body text */
    bodyText: string;
    /** The form validation error messages */
    validationErrors?: FormValidationResponse;
    /** Primary button text */
    primaryBtnText: string;
    /** Called when the primary button is clicked */
    primaryBtnHandler: () => void;
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

export interface PopupState {
    primaryBtnShowSpinner: boolean;
    secondaryBtnShowSpinner: boolean;
}

export class Popup extends React.Component<PopupProps, PopupState> {

    state = {
        primaryBtnShowSpinner: false,
        secondaryBtnShowSpinner: false,
    }

    constructor(props) {
        super(props);

        // bind callbacks once
        this._primaryBtnHandler = this._primaryBtnHandler.bind(this);
        this._secondaryBtnHandler = this._secondaryBtnHandler.bind(this);
    }

    static getDerivedStateFromProps(props: PopupProps): Partial<PopupState> {
        if (props.validationErrors != null) {
            // if there are validation errors, reset the button spinners
            return {
                primaryBtnShowSpinner: false,
                secondaryBtnShowSpinner: false
            };
        }
        return null;
    }

    _primaryBtnHandler(): void {
        this.props.primaryBtnHandler();
        this.setState({ primaryBtnShowSpinner: true });
    }

    _secondaryBtnHandler(): void {
        this.props.secondaryBtnHandler();
        this.setState({ secondaryBtnShowSpinner: true });
    }

    render(): JSX.Element {
        const { headerText, bodyText, primaryBtnText, secondaryBtnText,
            primaryBtnStyle, secondaryBtnStyle, validationErrors, children } = this.props;
        const { primaryBtnShowSpinner, secondaryBtnShowSpinner } = this.state;

        return <Modal>
            <div className="popup">
                <div className="popup__header">
                    {headerText}
                </div>

                <div className="popup__body">
                    {splitTextByNewLine(bodyText)}

                    <Form
                        primaryBtnText={primaryBtnText}
                        primaryBtnStyle={primaryBtnStyle}
                        onSubmitHandler={this._primaryBtnHandler}
                        primaryBtnShowSpinner={primaryBtnShowSpinner}
                        secondaryBtnText={secondaryBtnText}
                        secondaryBtnStyle={secondaryBtnStyle}
                        secondaryBtnHandler={this._secondaryBtnHandler}
                        secondaryBtnShowSpinner={secondaryBtnShowSpinner}
                        validationErrors={validationErrors}
                        alwaysEnableSubmitButton={true}
                    >

                        {children}

                    </Form>
                </div>
            </div>
        </Modal>
    };
}

export default Popup;
