import * as React from 'react';

import Loading from "./loading";

export interface ListGroupEmptyProps {
  label: string;
  loading?: boolean;
}

const ListGroupEmpty: React.StatelessComponent<ListGroupEmptyProps> =
  ({ label, loading }): JSX.Element => {

    return <div className="list-group__empty">
        {loading ? <Loading label={label}/> : label}
    </div>
  }

export default ListGroupEmpty;
