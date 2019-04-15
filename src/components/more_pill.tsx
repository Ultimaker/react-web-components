// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { I18n } from '../utils/i18n';

// Components
import Pill from './pill';
import Tooltip from './tooltip';

export interface MorePillProps {
    names: string[];
}

const T = {
    plus: (count: number) => I18n.format('more teams pill title', '+%{count}', { count }),
};

/**
 * The more pill component that shows the team name.
 */
export const MorePill: React.StatelessComponent<MorePillProps> = ({ names }) => (
    <Tooltip tooltipText={names.join('\n')}>
        <div className="more-pill">
            <Pill>
                <div className="more-pill__text">{T.plus(names.length)}</div>
            </Pill>
        </div>
    </Tooltip>
);

MorePill.displayName = 'MorePill';

export default MorePill;
