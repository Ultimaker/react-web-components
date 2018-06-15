import * as React from 'react';
import * as classNames from 'classnames';

export interface ListGroupRowProps {
  disabled?: boolean;
  selected?: boolean;
}

const ListGroupRow: React.StatelessComponent<ListGroupRowProps> =
  ({ disabled, selected, children }): JSX.Element => {

    const classes = classNames('list-group__row', { disabled, selected });

    return <div className={classes}>
      <div className="cover" />
      <div className="row-content">
        {children}
      </div>
    </div>
  }

export default ListGroupRow;
