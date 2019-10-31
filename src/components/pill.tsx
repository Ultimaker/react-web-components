import * as React from 'react';
import classNames from 'classnames';

const PILL_CLASSNAME = 'pill';
const PILL_CLASSNAME_ACTIVE = 'pill--active';

export interface PillProps {
    active?: boolean
}

export const Pill: React.FC<PillProps> = ({ active, children }) => {
    const classes = classNames(PILL_CLASSNAME, {
        [PILL_CLASSNAME_ACTIVE]: active,
    });

    return <span className={classes}>{children}</span>;
};

Pill.defaultProps = {
    active: false,
};

Pill.displayName = 'Pill';

export default Pill;
