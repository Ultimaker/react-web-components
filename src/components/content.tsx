
import * as React from 'react';
import * as classNames from 'classnames';

export type Padding = 'none' | 'sm' | 'md' | 'lg';

export interface ContentProps {
  padding?: Padding
}

export const Content: React.StatelessComponent<ContentProps> =
  ({ padding, children }): JSX.Element => {

    const classes = classNames('content', `padding--${padding}`);

    return <div className={classes} >
      {children}
    </div>
  }

Content.defaultProps = {
  padding: 'md'
}

export default Content;
