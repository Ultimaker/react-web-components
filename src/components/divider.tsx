import * as React from 'react';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Direction to position the divider: 'horizontal' | 'vertical' */
  direction?: DividerDirection;
}

export const Divider: React.StatelessComponent<DividerProps> = ({ direction }) => {

  return (
    <div className={`divider divider--${direction}`}></div>
  );
};

Divider.defaultProps = {
  direction: 'horizontal'
};

export default Divider;