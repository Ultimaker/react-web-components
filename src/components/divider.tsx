import * as React from 'react';
import classNames from 'classnames';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps {
    /** Direction to position the divider: 'horizontal' | 'vertical' */
    direction?: DividerDirection;
    /** If true a margin will be applied to the divider */
    margin?: boolean;
}

export const Divider: React.StatelessComponent<DividerProps> = ({ direction, margin }) => (
    <div className={classNames(`divider divider--${direction}`, { 'divider--with-margin': margin })} />
);

Divider.defaultProps = {
    direction: 'horizontal',
    margin: false,
};

Divider.displayName = 'Divider';

export default Divider;
