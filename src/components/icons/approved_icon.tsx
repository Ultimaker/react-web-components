import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const ApprovedIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--approved`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16,29A13,13,0,1,0,3,16,13,13,0,0,0,16,29ZM8,14.59l6,5.3L23.89,9l2.22,2L14.18,24.11,6,16.83Z" fill="none" />
            <path d="M16,32A16,16,0,1,0,0,16,16,16,0,0,0,16,32ZM16,3A13,13,0,1,1,3,16,13,13,0,0,1,16,3Z" />
            <polygon points="26.11 11.01 23.89 8.99 13.96 19.89 8 14.59 6 16.83 14.18 24.11 26.11 11.01" />
        </svg>
    </div>
);

ApprovedIcon.displayName = 'ApprovedIcon';

export default IconWrapper(ApprovedIcon);
