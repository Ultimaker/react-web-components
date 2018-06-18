import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';

export type Padding = 'none' | 'sm' | 'md' | 'lg';
export type Layout = 'left' | 'center' | 'right'

export interface ContentProps {
  padding?: Padding;
  align?: "center" | "left" | "right"
}

export const Content: React.StatelessComponent<ContentProps> =
  ({ padding, align, children }): JSX.Element => {

    const classes = classNames('content', `padding--${padding}`, 'layout', `layout--align${_.capitalize(align)}`);

    return <div className={classes} >
      {children}
    </div>
  }

Content.defaultProps = {
  padding: 'md',
  align: 'left'
}

export default Content;
