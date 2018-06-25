import * as React from 'react';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Direction to position the divider: 'horizontal' | 'vertical' */
  dividerDirection?: DividerDirection;
}

export const Divider: React.StatelessComponent<DividerProps> = ({ dividerDirection }) => {

  return (
    <div className={`divider divider--${dividerDirection}`}></div>
  );
};

Divider.defaultProps = {
  dividerDirection: 'horizontal'
};

export default Divider;