import * as React from 'react';

import { default as Button, ButtonStyle } from './button';

export interface FormProps {
	primaryBtnText: string;
	onSubmitHandler: () => void;
	primaryBtnStyle?: ButtonStyle;
	secondaryBtnText?: string;
	secondaryBtnHandler?: () => void;
	secondaryBtnStyle?: ButtonStyle;
	formValidation?: any;
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

	private popupBody: HTMLElement;

	constructor(props) {
		super(props);

		this.state = {
			primaryBtnSpinner: false,
			secondaryBtnSpinner: false,
		};

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
		const { primaryBtnText, secondaryBtnText, primaryBtnStyle, secondaryBtnStyle, formValidation, children } = this.props;
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

					{secondaryBtnText &&
						<div className="btn__container">
							<Button
								style={secondaryBtnStyle}
								disabled={primaryBtnSpinner}
								onClickHandler={this._secondaryBtnHandler}
								showSpinner={secondaryBtnSpinner}>

								{secondaryBtnText}
							</Button>
						</div>
					}

				</div>
			</form>
		)
	}
}

export default Form;