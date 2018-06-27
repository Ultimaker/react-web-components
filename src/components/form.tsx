import * as React from 'react';
import { Link } from 'react-router-dom';

import { default as Button, ButtonStyle } from './button';

export interface FormProps {
	/** Primary button text */
	primaryBtnText: string;
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
	/** A url to link to instead of calling secondaryBtnHandler */
	secondaryBtnLink?: string;
	/** The form validation state and validation error messages */
	formValidation?: FormValidationResponse;
}

export interface FormState {
	primaryBtnSpinner: boolean;
	secondaryBtnSpinner: boolean;
}

export interface FormValidationResponse {
	success: boolean;
	validationErrors?: { [key: string]: string }
}


export class Form extends React.Component<FormProps, FormState> {

	state = {
		primaryBtnSpinner: false,
		secondaryBtnSpinner: false
	}

	constructor(props) {
		super(props);

		// bind callbacks once
		this._onSubmitHandler = this._onSubmitHandler.bind(this);
		this._secondaryBtnHandler = this._secondaryBtnHandler.bind(this);
	}

	_onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		this.props.onSubmitHandler();
	}

	_secondaryBtnHandler(): void {
		this.props.secondaryBtnHandler();
	}

	render(): JSX.Element {
		const { primaryBtnText, secondaryBtnText, primaryBtnStyle, secondaryBtnStyle, formValidation, secondaryBtnLink, children } = this.props;
		const { primaryBtnSpinner, secondaryBtnSpinner } = this.state;

		const isValidationErrors = formValidation && formValidation.success === false;

		return (
			<form noValidate className="form" onSubmit={this._onSubmitHandler}>
				{React.Children.map(children, (child: any) =>
					<div className="form__item">
						{React.cloneElement(child, {
							validationError: isValidationErrors && formValidation.validationErrors[child.props.id],
							validationErrorMsg: isValidationErrors ? formValidation.validationErrors[child.props.id] : null
						})}
					</div>
				)}

				<div className="form__actions">
					<div className="btn__container">
						<Button
							style={primaryBtnStyle}
							disabled={secondaryBtnSpinner || isValidationErrors}
							type="submit"
							showSpinner={primaryBtnSpinner}>

							{primaryBtnText}
						</Button>
					</div>

					{secondaryBtnText && !secondaryBtnLink &&
						<div className="btn__container">
							<Button
								style={secondaryBtnStyle}
								disabled={primaryBtnSpinner}
								onClickHandler={this._secondaryBtnHandler}
								showSpinner={secondaryBtnSpinner}
							>
								{secondaryBtnText}
							</Button>
						</div>
					}

					{secondaryBtnText && secondaryBtnLink &&
						<div className="btn__container">
							<Link to={secondaryBtnLink} className="btn btn--quiet">
								<span className="text">{secondaryBtnText}</span>
							</Link>
						</div>
					}

				</div>
			</form>
		)
	}
}

export default Form;