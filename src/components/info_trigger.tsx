import * as React from 'react';

import Tooltip from './tooltip';

export interface InfoTriggerProps {
  infoText: string;
}

const InfoTrigger: React.StatelessComponent<InfoTriggerProps> =
  ({ infoText }) => {

    return (
      <div className="info-trigger">
        <Tooltip tooltipText={infoText} direction={'south'} >
          <div className="icon icon--circle">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><title>information-icon</title><path d="M12,14.5v-5a1,1,0,0,0-1-1H10a1,1,0,0,0,0,2v4a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" /><circle cx="11" cy="6.5" r="1" /></svg>
          </div>
        </Tooltip>
      </div>
    );
  };

export default InfoTrigger;