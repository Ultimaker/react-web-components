import * as React from 'react';

import LinkIcon from './icons/link_icon';

export interface InfoLinkProps {
    /** The URL of the link */
    infoLinkURL: string;
}

export const InfoLink: React.StatelessComponent<InfoLinkProps> =
    ({ infoLinkURL }) => {

        return (
            <div className="info-link">
                <a className="icon icon--circle" href={infoLinkURL} target="_blank">
                    <LinkIcon />
                </a>
            </div>
        );
    };

InfoLink.displayName = "InfoLink";

export default InfoLink;
