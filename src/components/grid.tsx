import * as React from 'react';
import * as _ from 'lodash';
import classNames = require('classnames');

export type Align = 'left' | 'center' | 'right';
export type Gutter = 'tiny' | 'small' | 'medium' | 'large' | 'without' ;

export interface GridProps {
  /** Title label for the grid */
  title?: string;
  /** Alignment of the grid items: 'left' | 'center' | 'right' */
  align?: Align;
  /** Gutter size between the grid items: 'tiny' | 'small' | 'medium' | 'large' | 'without' */
  gutter?: Gutter;
}

export const Grid: React.StatelessComponent<GridProps> =
  ({ title, align, gutter, children }): JSX.Element => {

    const classes = classNames("grid-component", "layout", `layout--align${_.capitalize(align)}`, `layout--${gutter}Gutter`)

    return <div className={classes}>
      {title && <h3 className="grid-component__title">{title}</h3>}
      {children}
    </div>
  }

Grid.defaultProps = {
  align: 'left',
  gutter: 'medium'
}

export default Grid;
