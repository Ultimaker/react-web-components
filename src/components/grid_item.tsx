import * as React from 'react';
import * as classNames from 'classnames';

export type WidthFraction = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' ;
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface GridItemProps {
  /** Width of the grid item: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  widthFraction?: WidthFraction;
  /** Breakpoint at which the widthFraction will be applied: 'xs' | 'sm' | 'md' | 'lg' */
  breakpoint?: Breakpoint;
}

export const GridItem: React.StatelessComponent<GridItemProps> =
  ({ widthFraction, breakpoint, children }): JSX.Element => {

    const breakpointClass = breakpoint === 'xs' ? '' : '-' + breakpoint;

    const classes = classNames('grid-component__item', 'layout__item', 'layout--gutterBelow', `u-${widthFraction}${breakpointClass}`);

    return <div className={classes}>
        {children}
    </div>
  }

  GridItem.defaultProps = {
    widthFraction: '1/1',
    breakpoint: 'xs'
  }

export default GridItem;
