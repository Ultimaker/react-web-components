// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Pill from './pill';
import Tooltip from './tooltip';

export interface BetaPillProps {
    /** The text to be shown in the tooltip to explain the beta program */
    betaExplanationText?: string;
}

export const BetaPill: React.StatelessComponent<BetaPillProps> = ({
    betaExplanationText,
}) => (
    <div className="beta-pill">
        <Tooltip
            tooltipText={betaExplanationText}
            disableTooltip={betaExplanationText.length === 0}
        >
            <Pill active>BETA</Pill>
        </Tooltip>
    </div>
);

export default BetaPill;
