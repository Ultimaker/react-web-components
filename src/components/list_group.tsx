import * as React from 'react';
import * as _ from 'lodash';
import classNames = require('classnames');

export interface ListGroupProps {
  title?: string;
  align?: "center" | "left" | "right"
}

const ListGroup: React.StatelessComponent<ListGroupProps> =
  ({ title, align, children }): JSX.Element => {

    const classes = classNames("layout", "list-group", `layout--align${_.capitalize(align)}`)

    return <div className={classes}>
      {title && <h3 className="list-group__title">{title}</h3>}
      {children}
    </div>
  }

ListGroup.defaultProps = {
  align: "left"
}

export default ListGroup;
