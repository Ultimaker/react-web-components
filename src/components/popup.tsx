import * as React from 'react';

// components
import Modal from './modal';
import { Form, FormValidationResponse } from './form';
import { ButtonStyle } from './button';
import { ProgressBar } from './progress_bar';

// utils
import splitTextByNewLine from '../utils/split_text_by_new_line';

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
    /** The current step number of a multi-step popup */
    step?: number;
    /** The total number of steps of a multi-step popup */
    totalSteps?: number;
}

export interface PopupState {
    primaryBtnShowSpinner: boolean;
    secondaryBtnShowSpinner: boolean;
    storedStep: number;
}

export class Popup extends React.Component<PopupProps, PopupState> {

    state = {
        primaryBtnShowSpinner: false,
        secondaryBtnShowSpinner: false,
        storedStep: null
    }

    constructor(props) {
        super(props);

        // bind callbacks once
        this._primaryBtnHandler = this._primaryBtnHandler.bind(this);
        this._secondaryBtnHandler = this._secondaryBtnHandler.bind(this);
    }

    static getDerivedStateFromProps(props: PopupProps, state: PopupState): Partial<PopupState> {
        if (props.validationErrors != null) {
            // if there are validation errors, reset the button spinners
            return {
                primaryBtnShowSpinner: false,
                secondaryBtnShowSpinner: false
            };
        }
        if (props.step !== state.storedStep) {
            // if the step changes, reset the button spinners
            return {
                storedStep: props.step,
                primaryBtnShowSpinner: false,
                secondaryBtnShowSpinner: false
            };
        }
        return null;
    }

    private _primaryBtnHandler(): void {
        this.props.primaryBtnHandler();
        this.setState({ primaryBtnShowSpinner: true });
    }

    private _secondaryBtnHandler(): void {
        this.props.secondaryBtnHandler();
        this.setState({ secondaryBtnShowSpinner: true });
    }

    render(): JSX.Element {
        const { headerText, bodyText, primaryBtnText, secondaryBtnText,
            primaryBtnStyle, secondaryBtnStyle, validationErrors, step, totalSteps, children } = this.props;
        const { primaryBtnShowSpinner, secondaryBtnShowSpinner } = this.state;

        return <div className="popup">
            <Modal>
                <div>
                    <div className="popup__content">
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
                    {step && totalSteps &&
                        <ProgressBar progressPercentage={step / totalSteps * 100} barHeight="0.9rem" />
                    }
                </div>
            </Modal>
        </div>
    };
}

export default Popup;
