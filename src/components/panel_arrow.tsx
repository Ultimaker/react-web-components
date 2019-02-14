import * as React from 'react';
import classNames from 'classnames';

// components
import SingleArrowIcon from '../components/icons/single_arrow_icon';

export type ArrowColor = 'black' | 'blue';

export interface PanelArrowProps {
    /** If true the arrow will be flipped */
    active: boolean;
    /** Arrow color: 'black' | 'blue' */
    color?: ArrowColor;
    /** Arrow width. Include width unit  */
    width: string;
}

export const PanelArrow: React.StatelessComponent<PanelArrowProps> = ({ active, width, color }) => {
    const classes = classNames(`panel-arrow panel-arrow--${color}`, { 'panel-arrow--active': active });

    return (
        <div className={classes} style={{ width }}>
            <SingleArrowIcon />
        </div>
    );
};

PanelArrow.defaultProps = {
    color: 'black',
};

PanelArrow.displayName = 'PanelArrow';

export default PanelArrow;
