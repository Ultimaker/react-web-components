import * as React from 'react';
import * as classNames from 'classnames';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Direction to position the divider: 'horizontal' | 'vertical' */
  direction?: DividerDirection;
  /** If true a margin will be applied to the divider */
  margin?: boolean;
}

export const Divider: React.StatelessComponent<DividerProps> = ({ direction, margin }) => {

  return (
    <div className={classNames(`divider divider--${direction}`, { 'divider--with-margin': margin })}></div>
  );
};

Divider.defaultProps = {
  direction: 'horizontal',
  margin: false
};

export default Divider;