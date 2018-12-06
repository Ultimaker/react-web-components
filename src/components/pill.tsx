import * as React from 'react';
import classNames from 'classnames';

export interface PillProps {
    /** Whether the pill should be shown as active */
    active?: boolean
}

export const Pill: React.StatelessComponent<PillProps> = ({ active, children }) => {
    const classes = classNames('pill', { active });

    return <div className={classes}>{children}</div>;
};

Pill.defaultProps = {
    active: false,
};

Pill.displayName = 'Pill';

export default Pill;
