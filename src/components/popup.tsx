import * as React from 'react';

// components
import { ModalWidth } from './modal';
import { Form, FormValidationResponse } from './form';
import { ButtonAppearance } from './button';
import PopupBase from './popup_base';

// utils
import splitTextByNewLine from '../utils/split_text_by_new_line';

export interface PopupProps {
    /** Popup header element, above the header text */
    headerElement?: JSX.Element;
    /** Popup header text */
    headerText?: string;
    /** Popup body text */
    bodyText?: string;
    /** The form validation error messages */
    validationErrors?: FormValidationResponse;
    /** Primary button text */
    primaryBtnText: string;
    /**
     * Called when the primary button is clicked.
     * If it returns a promise, the spinner is hidden when it is done
     */
    primaryBtnHandler: () => void | Promise<any>;
    /** Primary button appearance */
    primaryBtnAppearance?: ButtonAppearance;
    /** Secondary button text */
    secondaryBtnText?: string;
    /**
     * Called when the secondary button is clicked.
     * If it returns a promise, the spinner is hidden when it is done
     */
    secondaryBtnHandler?: () => void | Promise<any>;
    /** Secondary button appearance */
    secondaryBtnAppearance?: ButtonAppearance;
    /** Placeholder text for the input for popups of type prompt */
    promptPlaceholder?: string;
    /** The width of the popup: 'sm' | 'md' */
    width?: ModalWidth;
    /** The current step number of a multi-step popup */
    step?: number;
    /** The total number of steps of a multi-step popup */
    totalSteps?: number;
    /** A component or text to be rendered in the footer of the popup */
    footer?: any;
}

export interface PopupState {
    primaryBtnShowSpinner: boolean;
    secondaryBtnShowSpinner: boolean;
    /**
     * Saved solely to be used as a comparison in getDerivedStateFromProps
     * to check whether the step prop has changed
     */
    storedStep: number;
}

export class Popup extends React.Component<PopupProps, PopupState> {
    static defaultProps = {
        width: 'sm',
    };

    constructor(props) {
        super(props);
        this.setState({
            primaryBtnShowSpinner: false,
            secondaryBtnShowSpinner: false,
            storedStep: null, // eslint-disable-line react/no-unused-state
        });
        this._primaryBtnHandler = this._primaryBtnHandler.bind(this);
        this._secondaryBtnHandler = this._secondaryBtnHandler.bind(this);
    }

    static getDerivedStateFromProps(props: PopupProps, state: PopupState): Partial<PopupState> {
        if (props.validationErrors) {
            // if there are validation errors, reset the button spinners
            return {
                primaryBtnShowSpinner: false,
                secondaryBtnShowSpinner: false,
            };
        }
        if (props.step !== state.storedStep) {
            // if the step changes, reset the button spinners
            return {
                storedStep: props.step,
                primaryBtnShowSpinner: false,
                secondaryBtnShowSpinner: false,
            };
        }
        return null;
    }

    /**
     * Handles a click on the primary button
     */
    private _primaryBtnHandler(): void {
        const { primaryBtnHandler } = this.props;
        const promise = primaryBtnHandler();
        this.setState({ primaryBtnShowSpinner: true });
        if (promise) {
            const hideSpinner = () => this.setState({ primaryBtnShowSpinner: false });
            promise.then(hideSpinner, hideSpinner);
        }
    }

    /**
     * Handles a click on the secondary button
     */
    private _secondaryBtnHandler(): void {
        const { secondaryBtnHandler } = this.props;
        const promise = secondaryBtnHandler();
        this.setState({ secondaryBtnShowSpinner: true });
        if (promise) {
            const hideSpinner = () => this.setState({ secondaryBtnShowSpinner: false });
            promise.then(hideSpinner, hideSpinner);
        }
    }

    render(): JSX.Element {
        const {
            headerElement, headerText, bodyText, primaryBtnText, secondaryBtnText,
            primaryBtnAppearance, secondaryBtnAppearance, validationErrors, step, totalSteps,
            width, footer, children,
        } = this.props;
        const { primaryBtnShowSpinner, secondaryBtnShowSpinner } = this.state;

        return (
            <PopupBase
                headerElement={headerElement}
                headerText={headerText}
                step={step}
                totalSteps={totalSteps}
                width={width}
                footer={footer}
            >
                {bodyText && splitTextByNewLine(bodyText)}
                <Form
                    primaryBtnText={primaryBtnText}
                    primaryBtnAppearance={primaryBtnAppearance}
                    onSubmitHandler={this._primaryBtnHandler}
                    primaryBtnShowSpinner={primaryBtnShowSpinner}
                    secondaryBtnText={secondaryBtnText}
                    secondaryBtnAppearance={secondaryBtnAppearance}
                    secondaryBtnHandler={this._secondaryBtnHandler}
                    secondaryBtnShowSpinner={secondaryBtnShowSpinner}
                    validationErrors={validationErrors}
                    alwaysEnableSubmitButton
                >
                    {children}
                </Form>
            </PopupBase>
        );
    }
}

export default Popup;
