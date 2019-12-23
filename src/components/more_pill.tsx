// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// Components
import Pill from './pill';
import Tooltip from './tooltip';

export interface MorePillProps {
    names: string[];
}

/**
 * The more pill component that shows the team name.
 */
export const MorePill: React.FC<MorePillProps> = ({ names }) => (
    <Tooltip tooltipText={names.join('\n')}>
        <div className="more-pill">
            <Pill>
                <div className="more-pill__text">{`+${names.length}`}</div>
            </Pill>
        </div>
    </Tooltip>
);

MorePill.displayName = 'MorePill';

export default MorePill;
