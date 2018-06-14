import * as React from 'react';
import * as classNames from 'classnames';

export interface PanelArrowProps {
  active: boolean;
  widthInPixels: number;
}

const PanelArrow: React.StatelessComponent<PanelArrowProps> = ({ active, widthInPixels }) => {

  const classes = classNames('panel-arrow', { 'active': active });

  return (
    <img className={classes} src={"/static/images/icons/panel-arrow.svg"} style={{width: widthInPixels}}/>
  );
};

export default PanelArrow;