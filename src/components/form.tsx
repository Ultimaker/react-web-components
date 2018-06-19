import * as React from 'react';

export default class Form extends React.Component {

	render(): JSX.Element {
		return (
			<form className="form">
				{React.Children.map(this.props.children, (child: any) =>
					<div>
						{React.cloneElement(child)}
					</div>
				)}
			</form>
		)
	}
}
