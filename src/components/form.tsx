import * as React from 'react';
import ListGroup from './list_group';
import ListGroupRow from './list_group_row';

export default class Form extends React.Component {

	render(): JSX.Element {
		return (
			<ListGroup>
				<form className="form">
					{ React.Children.map(this.props.children, (child: any) =>
						<ListGroupRow>
							{ React.cloneElement(child) }
						</ListGroupRow>
					) }
				</form>
			</ListGroup>
		)
	}
}
