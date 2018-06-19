import * as React from 'react';
import ListGroup from './list_group';

export default class Form extends React.Component {

	render(): JSX.Element {
		return (
			<ListGroup>
				<form className="form">
					{React.Children.map(this.props.children, (child: any) =>
						React.cloneElement(child)
					)}
				</form>
			</ListGroup>
		)
	}
}
