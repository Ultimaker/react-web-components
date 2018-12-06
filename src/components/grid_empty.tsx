import * as React from 'react';

import GridItem from './grid_item';
import Loading from './loading';

export interface GridEmptyProps {
    label: string;
    loading?: boolean;
}

const GridEmpty: React.StatelessComponent<GridEmptyProps> = ({ label, loading }): JSX.Element => (
    <GridItem>
        <div className="grid-component__empty">
            {loading ? <Loading label={label} /> : label}
        </div>
    </GridItem>
);

GridEmpty.displayName = 'GridEmpty';

export default GridEmpty;
