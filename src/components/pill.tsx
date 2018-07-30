import * as React from 'react';
import classNames from 'classnames';

export interface PillProps {
  /** Text to be shown inside the pill */
  text: string
  /** Whether the pill should be shown as active **/
  active?: boolean
}

export const Pill: React.StatelessComponent<PillProps> =
  ({ text, active }) => {

    const classes = classNames('pill', { 'active': active });

    return <div className={classes}>{text}</div>
  };

Pill.defaultProps = {
  active: false
};

export default Pill;
