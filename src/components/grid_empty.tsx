import * as React from 'react';

import GridItem from './grid_item';
import Loading from "./loading";

export interface ListGroupEmptyProps {
  label: string;
  loading?: boolean;
}

const ListGroupEmpty: React.StatelessComponent<ListGroupEmptyProps> =
  ({ label, loading }): JSX.Element => {

    return <GridItem>
      <div className="grid-component__empty">
        {loading ? <Loading label={label}/> : label}
      </div>
    </GridItem>
  }

export default ListGroupEmpty;
