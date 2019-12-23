import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const LinkIcon: React.FC<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--link`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M31.06,14.16A2.89,2.89,0,0,1,29,13.31V26a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V6A3,3,0,0,1,6,3H18.65l0,0a2.91,2.91,0,0,1-.69-3H6A6,6,0,0,0,0,6V26a6,6,0,0,0,6,6H26a6,6,0,0,0,6-6V14A3,3,0,0,1,31.06,14.16Z" />
            <path d="M21.46,3l1.12,1.13-12,12.15a1.86,1.86,0,0,0,0,2.62L13,21.45a1.86,1.86,0,0,0,2.64,0L27.79,9.25,29,10.47l1.4,1.42A.93.93,0,0,0,32,11.23V1.17A1.16,1.16,0,0,0,30.84,0H20.67a.92.92,0,0,0-.62,1.57Z" />
        </svg>
    </div>
);

LinkIcon.displayName = 'LinkIcon';

export default IconWrapper(LinkIcon);
