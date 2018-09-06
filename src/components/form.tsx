import * as React from 'react';
import { Link } from 'react-router-dom';

import { default as Button, ButtonStyle } from './button';


/** The validation of each field may be a text, a list of elements or the validation of a sub-model **/
export type FormValidationResponse = { [key: string]: string | JSX.Element[] | FormValidationResponse };

export interface FormProps {
    /** Primary button text */
    primaryBtnText?: string;
    /** Called when the primary button is clicked to submit the form */
    onSubmitHandler: () => void;
    /** Primary button style type */
    primaryBtnStyle?: ButtonStyle;
    /** Secondary button text */
    secondaryBtnText?: string;
    /** Called when the secondary button is clicked */
    secondaryBtnHandler?: () => void;
    /** Primary button style type */
    secondaryBtnStyle?: ButtonStyle;
    /** An internal url link to be used instead of calling secondaryBtnHandler */
    secondaryBtnLink?: string;
    /** The form validation state and validation error messages */
    validationErrors?: FormValidationResponse;
    /** Override the form validation and enable the primary button */
    alwaysEnableSubmitButton?: boolean;
}

export interface FormState {
    submitted: boolean;
}


export class Form extends React.Component<FormProps, FormState> {

    state = {
        primaryBtnSpinner: false,
        secondaryBtnSpinner: false,
        submitted: false
    }

    constructor(props) {
        super(props);

        // bind callbacks once
        this._onSubmitHandler = this._onSubmitHandler.bind(this);
        this._renderChild = this._renderChild.bind(this);
    }

    _onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({ submitted: true });
        this.props.onSubmitHandler();
    }

	/**
 * Renders a single child of the form component. If the child has the `id` props, we will check for errors in the
 * form validation, any errors are passed as extra props to the child.
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
                    submitted
                })}
            </div>
        )
    }

    render(): JSX.Element {
        const { primaryBtnText, secondaryBtnText, primaryBtnStyle, secondaryBtnStyle, validationErrors,
            secondaryBtnHandler, secondaryBtnLink, alwaysEnableSubmitButton, children } = this.props;

        return (
            <form noValidate className="form" onSubmit={this._onSubmitHandler}>
                {React.Children.map(children, this._renderChild)}
                {primaryBtnText &&
                    <div className="form__actions">
                        {primaryBtnText &&
                            <div className="form__btn-container">
                                <Button
                                    style={primaryBtnStyle}
                                    disabled={alwaysEnableSubmitButton ? false : validationErrors !== null}
                                    type="submit" >

                                    {primaryBtnText}
                                </Button>
                            </div>
                        }

                        {secondaryBtnText && !secondaryBtnLink &&
                            <div className="form__btn-container">
                                <Button
                                    style={secondaryBtnStyle}
                                    onClickHandler={secondaryBtnHandler}
                                >
                                    {secondaryBtnText}
                                </Button>
                            </div>
                        }

                        {secondaryBtnText && secondaryBtnLink &&
                            <div className="form__btn-container">
                                <Link to={secondaryBtnLink} className="btn btn--quiet">
                                    <span className="text">{secondaryBtnText}</span>
                                </Link>
                            </div>
                        }

                    </div>
                }
            </form>
        )
    }
}

export default Form;
