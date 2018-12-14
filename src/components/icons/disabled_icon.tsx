import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const DisabledIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--disabled`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm0,3a13.7,13.7,0,0,1,8.1,2.8L5.8,24.1A13.7,13.7,0,0,1,3,16,13,13,0,0,1,16,3Zm0,26a13.7,13.7,0,0,1-8.1-2.8L26.2,7.9A13.7,13.7,0,0,1,29,16,13,13,0,0,1,16,29Z" />
        </svg>
    </div>
);

DisabledIcon.displayName = 'DisabledIcon';

export default IconWrapper(DisabledIcon);
