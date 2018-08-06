import * as React from 'react';

export interface InfoLinkProps {
  /** The URL of the link */
  infoLinkURL: string;
}

export const InfoLink: React.StatelessComponent<InfoLinkProps> =
  ({ infoLinkURL }) => {

    return (
      <div className="info-link">
          <a className="icon icon--circle" href={infoLinkURL} target="_blank">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M12,14.5v-5a1,1,0,0,0-1-1H10a1,1,0,0,0,0,2v4a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" /><circle cx="11" cy="6.5" r="1" /></svg>
          </a>
      </div>
    );
  };

export default InfoLink;