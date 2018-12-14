import * as React from 'react';

import classNames = require('classnames');

export type Align = 'left' | 'center' | 'right';
export type Position = 'top' | 'middle' | 'bottom';
export type Gutter = 'xs' | 'sm' | 'md' | 'lg' | 'none';

export interface GridProps {
    /** Alignment (horizontal) of the grid items: 'left' | 'center' | 'right' */
    align?: Align;
    /** Position (vertical) of the grid items: 'top' | 'middle' | 'bottom' */
    position?: Position;
    /** Gutter size between the grid items: 'xs' | 'sm' | 'md' | 'lg' | 'none' */
    gutter?: Gutter;
    /** An optional class name for the grid */
    className?: string;
}

export const Grid: React.StatelessComponent<GridProps> = ({
    align, gutter, position, children, className,
}): JSX.Element => {
    const classes = classNames('grid-component', 'layout', `layout--align-${align}`, `layout--gutter-${gutter}`,
        `layout--align-${position}`, `layout--gutter-${gutter}--above`, `layout--gutter-${gutter}--below`,
        className);

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

Grid.defaultProps = {
    align: 'left',
    gutter: 'md',
    position: 'top',
};

Grid.displayName = 'Grid';

export default Grid;
