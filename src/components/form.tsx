import * as React from 'react';

export interface FormProps {
  /** Called when the Button is clicked */
  inputLabelsWidth?: () => void;
  /** Disables the button when true */
  disabled?: boolean;
}

export const Form: React.StatelessComponent<FormProps> =
	({ children }) => {

		return (
			<form noValidate className="form">
				{React.Children.map(children, (child: any) =>
					<div className="form--item">
						{React.cloneElement(child)}
					</div>
				)}
			</form>
		)
	}

	export default Form;