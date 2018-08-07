import * as React from 'react';
import classNames from 'classnames';

export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill' ;
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface GridItemProps {
  /** Width of the grid item: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill' */
  layoutWidth?: LayoutWidth;
  /** Breakpoint at which the widthFraction will be applied: 'xs' | 'sm' | 'md' | 'lg' */
  breakpoint?: Breakpoint;
}

export const GridItem: React.StatelessComponent<GridItemProps> =
  ({ layoutWidth, breakpoint, children }): JSX.Element => {

    const breakpointClass = breakpoint === 'xs' ? '' : '-' + breakpoint;

    const classes = classNames('grid-component__item', 'layout__item', `u-${layoutWidth}${breakpointClass}`);

    return <div className={classes}>
        {children}
    </div>
  }

  GridItem.defaultProps = {
    layoutWidth: '1/1',
    breakpoint: 'xs'
  }

GridItem.displayName = "GridItem";

export default GridItem;
