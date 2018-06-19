import * as React from 'react';

import ListGroupRow from './list_group_row'
import Loading from "./loading";

export interface ListGroupEmptyProps {
  label: string;
  loading?: boolean;
}

const ListGroupEmpty: React.StatelessComponent<ListGroupEmptyProps> =
  ({ label, loading }): JSX.Element => {

    return <ListGroupRow>
      <div className="list-group__empty">
        {loading ? <Loading label={label}/> : label}
      </div>
    </ListGroupRow>
  }

export default ListGroupEmpty;
