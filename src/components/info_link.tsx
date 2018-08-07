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
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M25,14.91V26a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V10A3,3,0,0,1,6,7H16.94l2.84-2.86L19.64,4H6a6,6,0,0,0-6,6V26a6,6,0,0,0,6,6H22a6,6,0,0,0,6-6V12.29l-.2-.2Z" /><path d="M32,1.17A1.15,1.15,0,0,0,30.84,0H20.89a1,1,0,0,0-.71,1.7L22.47,4l.12.12L19.76,7l-9.22,9.3a1.85,1.85,0,0,0,0,2.61l2.51,2.54a1.86,1.86,0,0,0,2.64,0L25,12.07l2.8-2.82.17.17,2.32,2.34a1,1,0,0,0,.7.3,1,1,0,0,0,1-1Z" /></svg>
        </a>
      </div>
    );
  };

InfoLink.displayName = "InfoLink";

export default InfoLink;