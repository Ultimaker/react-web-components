import * as React from 'react';

import Tooltip from './tooltip';

export type InfoTooltipDirection = 'north' | 'south';

export interface InfoTooltipProps {
    /** Text to be displayed inside the tooltip. \n can be used to create a new paragraph. */
    infoText: string;
    /** The positional direction of the tooltip: 'north' | 'south' */
    direction?: InfoTooltipDirection;
    /** When true, the tooltip will not be displayed */
    disableTooltip?: boolean;
}

export const InfoTooltip: React.StatelessComponent<InfoTooltipProps> = ({
    infoText, direction, disableTooltip,
}) => (
    <div className="info-tooltip">
        <Tooltip tooltipText={infoText} direction={direction} disableTooltip={disableTooltip}>
            <div className="icon icon--circle">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                    <path d="M12,14.5v-5a1,1,0,0,0-1-1H10a1,1,0,0,0,0,2v4a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" />
                    <circle cx="11" cy="6.5" r="1" />
                </svg>
            </div>
        </Tooltip>
    </div>
);

InfoTooltip.displayName = 'InfoTooltip';

export default InfoTooltip;
