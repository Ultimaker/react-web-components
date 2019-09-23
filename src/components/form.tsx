import * as React from 'react';

import { Button, ButtonAppearance } from './button';
import FormActions from './form_actions';


/**
 * The validation of each field may be a text, a list of elements or the validation of a sub-model
 */
export type FormValidationResponse = {
    [key: string]: string
    | string[]
    | JSX.Element[]
    | FormValidationResponse
    | (FormValidationResponse | string)[],
};

export interface FormProps {
    /** Primary button text */
    primaryBtnText?: string;
    /** Called when the primary button is clicked to submit the form */
    onSubmitHandler: () => void;
    /** Primary button style type */
    primaryBtnAppearance?: ButtonAppearance;
    /** Secondary button text */
    secondaryBtnText?: string;
    /** Called when the secondary button is clicked */
    secondaryBtnHandler?: () => void;
    /** Primary button style type */
    secondaryBtnAppearance?: ButtonAppearance;
    /** An internal url link to be used instead of calling secondaryBtnHandler */
    secondaryBtnLink?: string;
    /** Replaces the secondary button text with a spinner when true */
    secondaryBtnShowSpinner?: boolean;
    /** The form validation error messages */
    validationErrors?: FormValidationResponse;
    /** Override the form validation and enable the primary button */
    alwaysEnableSubmitButton?: boolean;
    /** Replaces the primary button text with a spinner when true */
    primaryBtnShowSpinner?: boolean;
}

export interface FormState {
    submitted: boolean;
}


export class Form extends React.Component<FormProps, FormState> {
    constructor(props) {
        super(props);
        this.setState({
            submitted: false,
        });
        // bind callbacks once
        this._onSubmitHandler = this._onSubmitHandler.bind(this);
        this._renderChild = this._renderChild.bind(this);
    }

    private _onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
        const { onSubmitHandler } = this.props;
        e.preventDefault();
        this.setState({ submitted: true });
        onSubmitHandler();
    }

    private _isPrimaryBtnDisabled() {
        const { validationErrors, alwaysEnableSubmitButton, secondaryBtnShowSpinner } = this.props;

        if (secondaryBtnShowSpinner) {
            return true;
        }
        if (alwaysEnableSubmitButton) {
            return false;
        }
        return validationErrors !== null;
    }

    /**
     * Renders a single child of the form component. If the child has the `id` props, we will check
     * for errors in the form validation, any errors are passed as extra props to the child.
     * @param child - The child element to be rendered.
     * @private
     */
    private _renderChild(child: JSX.Element): JSX.Element {
        const { validationErrors } = this.props;
        const { submitted } = this.state;
        const errors = validationErrors && child && child.props && validationErrors[child.props.id];

        return child && (
            <div className="form__item">
                {React.cloneElement(child, errors && {
                    validationError: errors,
                    submitted: child.props.submitted || submitted,
                })}
            </div>
        );
    }

    render(): JSX.Element {
        const {
            primaryBtnText, secondaryBtnText, primaryBtnAppearance, secondaryBtnAppearance,
            secondaryBtnHandler, secondaryBtnLink, primaryBtnShowSpinner, secondaryBtnShowSpinner,
            children,
        } = this.props;

        return (
            <form noValidate className="form" onSubmit={this._onSubmitHandler}>
                {React.Children.map(children, this._renderChild)}
                {primaryBtnText
                    && (
                        <FormActions>
                            {primaryBtnText
                                && (
                                    <Button
                                        appearance={primaryBtnAppearance}
                                        showSpinner={primaryBtnShowSpinner}
                                        disabled={this._isPrimaryBtnDisabled()}
                                        type="submit"
                                    >

                                        {primaryBtnText}
                                    </Button>
                                )}
                            {secondaryBtnText
                                && (
                                    <Button
                                        appearance={secondaryBtnAppearance}
                                        showSpinner={secondaryBtnShowSpinner}
                                        disabled={primaryBtnShowSpinner}
                                        onClickHandler={secondaryBtnHandler}
                                        type={secondaryBtnLink ? 'link' : 'button'}
                                        linkURL={secondaryBtnLink}
                                    >
                                        {secondaryBtnText}
                                    </Button>
                                )}
                        </FormActions>
                    )}
            </form>
        );
    }
}

export default Form;
