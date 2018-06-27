import * as React from 'react';
import classNames = require('classnames');

export type Align = 'left' | 'center' | 'right';
export type Gutter = 'xs' | 'sm' | 'md' | 'lg' | 'none';

export interface GridProps {
  /** Alignment of the grid items: 'left' | 'center' | 'right' */
  align?: Align;
  /** Gutter size between the grid items: 'xs' | 'sm' | 'md' | 'lg' | 'none' */
  gutter?: Gutter;
}

export const Grid: React.StatelessComponent<GridProps> =
  ({ align, gutter, children }): JSX.Element => {

    const classes = classNames('grid-component', 'layout', `layout--align-${align}`,
      `layout--gutter-${gutter}`, `layout--gutter-${gutter}--above`, `layout--gutter-${gutter}--below`);

    return <div className={classes}>
      {children}
    </div>
  }

Grid.defaultProps = {
  align: 'left',
  gutter: 'md'
}

export default Grid;
