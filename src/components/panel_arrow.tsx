import * as React from 'react';
import * as classNames from 'classnames';

export type ArrowColor = 'black' | 'blue';

export interface PanelArrowProps {
  active: boolean;
  color?: ArrowColor;
  widthInPixels: number;
}

const PanelArrow: React.StatelessComponent<PanelArrowProps> = ({ active, widthInPixels, color }) => {

  const classes = classNames(`panel-arrow panel-arrow--${color}`, { 'panel-arrow--active': active });

  return (
    <div className={classes} style={{width: widthInPixels}}>
      <svg viewBox="0 0 11 7"><defs><clipPath id="_clipPath_yFUDiOcfPY354iUtWFrNwpkjnXItMyRi"><rect width="11" height="7"/></clipPath></defs><g clip-path="url(#_clipPath_yFUDiOcfPY354iUtWFrNwpkjnXItMyRi)"><path d=" M 5.5 4.172 L 9.5 0.172 L 10.914 1.586 L 6.914 5.586 L 5.5 7 L 0.086 1.586 L 1.5 0.172 L 5.5 4.172 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></g></svg>
    </div>
  );
};

PanelArrow.defaultProps = {
  color: 'black'
};

export default PanelArrow;