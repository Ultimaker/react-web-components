import * as React from 'react';
import classNames from 'classnames';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps {
    /** Direction to position the divider: 'horizontal' | 'vertical' */
    direction?: DividerDirection;
    /** If true a margin will be applied to the divider */
    margin?: boolean;
    /** Width of the divider line, including the unit */
    width?: string;
}

export const Divider: React.FC<DividerProps> = ({ direction, margin, width }) => (
    <div
        className={classNames(`divider divider--${direction}`, { 'divider--with-margin': margin })}
        style={direction === 'horizontal' ? { height: width, borderWidth: width } : { width, borderWidth: width }}
    />
);

Divider.defaultProps = {
    direction: 'horizontal',
    margin: false,
    width: '2px',
};

Divider.displayName = 'Divider';

export default Divider;
