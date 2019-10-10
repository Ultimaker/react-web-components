import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const ProfileIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--profile`}>
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,14.6c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5c3.6,0,6.5,2.9,6.5,6.5C18.5,11.7,15.6,14.6,12,14.6zM12,3.7c-2.5,0-4.5,2-4.5,4.5s2,4.5,4.5,4.5s4.5-2,4.5-4.5S14.5,3.7,12,3.7z" />
            <path d="M21.1,22.3c-0.3,0-0.5-0.1-0.7-0.3c0,0-3.4-3.3-8.4-3.3c-5,0-8.4,3.3-8.4,3.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4c0.2-0.2,4-3.9,9.8-3.9c5.8,0,9.6,3.8,9.8,3.9c0.4,0.4,0.4,1,0,1.4C21.6,22.2,21.3,22.3,21.1,22.3z" />
        </svg>
    </div>
);

ProfileIcon.displayName = 'ProfileIcon';

export default IconWrapper(ProfileIcon);
