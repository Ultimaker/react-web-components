import * as React from 'react';
import {IconWrapper, IconProps} from './icon_wrapper';

const DownloadIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--download`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
            <path d="M1.59,7H4.28V5.5H7.73V7h2.68L8.71,8.71,8.41,9H9.5A1.51,1.51,0,0,0,11,7.5,1.49,1.49,0,0,0,9.61,6L8.85,6l-.16-.75a2.74,2.74,0,0,0-5.12-.74L3.32,5,2.78,5A2,2,0,0,0,3,9h.59l-.3-.29Z" fill="none" />
            <path d="M9.68,5a3.75,3.75,0,0,0-7-1A3,3,0,0,0,3,10H4.59l-1-1H3a2,2,0,0,1-.22-4l.54,0,.25-.48a2.74,2.74,0,0,1,5.12.74L8.85,6l.76,0A1.49,1.49,0,0,1,11,7.5,1.51,1.51,0,0,1,9.5,9H8.41l-1,1H9.5a2.49,2.49,0,0,0,.18-5Z" />
            <polygon points="8 8 6.72 8 6.72 6.5 5.28 6.5 5.28 8 4 8 5 9 7 9 8 8" />
            <polygon points="7 9 5 9 6 10 7 9" />
        </svg>
    </div>
)

DownloadIcon.displayName = "DownloadIcon";

export default IconWrapper(DownloadIcon);
