import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const PublishedIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--published`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M22.66,10.57A7.34,7.34,0,0,1,23.5,14,7.5,7.5,0,1,1,9.34,10.57,19.34,19.34,0,0,0,3.09,16c3.55,4.61,8.12,7.14,12.91,7.14S25.36,20.61,28.91,16A19.46,19.46,0,0,0,22.66,10.57Z" fill="none" />
            <path d="M31.47,14.42C27.32,8.9,21.83,5.86,16,5.86S4.68,8.89.53,14.41a2.66,2.66,0,0,0,0,3.17C4.68,23.1,10.17,26.14,16,26.14s11.32-3,15.47-8.55A2.66,2.66,0,0,0,31.47,14.42ZM20,12.77a1.81,1.81,0,0,1-2.48-.35,1.81,1.81,0,0,1-.35-2.48,1.81,1.81,0,0,1,2.47.36A1.8,1.8,0,0,1,20,12.77ZM16,23.14c-4.79,0-9.36-2.53-12.91-7.14a19.34,19.34,0,0,1,6.25-5.43A7.5,7.5,0,1,0,23.5,14a7.34,7.34,0,0,0-.84-3.43A19.46,19.46,0,0,1,28.91,16C25.36,20.61,20.78,23.14,16,23.14Z" />
        </svg>
    </div>
);

PublishedIcon.displayName = 'PublishedIcon';

export default IconWrapper(PublishedIcon);
