import * as React from 'react';

export interface ListGroupProps {
  title: string;
}

const ListGroup: React.StatelessComponent<ListGroupProps> =
  ({ title, children }): JSX.Element => {

    return <div className="list-group">
      <h3 className="list-group__title">{title}</h3>
      {children}
    </div>
  }

export default ListGroup;
