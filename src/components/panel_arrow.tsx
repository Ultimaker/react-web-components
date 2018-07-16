import * as React from 'react';
import classNames from 'classnames';

export type ArrowColor = 'black' | 'blue';

export interface PanelArrowProps {
  /** If true the arrow will be flipped */
  active: boolean;
  /** Arrow color: 'black' | 'blue' */
  color?: ArrowColor;
  /** Arrow width. Include width unit  */
  width: string;
}

const PanelArrow: React.StatelessComponent<PanelArrowProps> = ({ active, width, color }) => {

  const classes = classNames(`panel-arrow panel-arrow--${color}`, { 'panel-arrow--active': active });

  return (
    <div className={classes} style={{width: width}}>
      <svg viewBox="0 0 11 7"><path d=" M 5.5 4.172 L 9.5 0.172 L 10.914 1.586 L 6.914 5.586 L 5.5 7 L 0.086 1.586 L 1.5 0.172 L 5.5 4.172 Z " fill="rgb(0,0,0)"/></svg>
    </div>
  );
};

PanelArrow.defaultProps = {
  color: 'black'
};

export default PanelArrow;