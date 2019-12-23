import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const BoxIcon: React.FC<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--box`}>
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22,6.9c0-0.1,0-0.2-0.1-0.3c0,0,0,0,0,0c0,0,0,0,0,0c0-0.1-0.1-0.2-0.2-0.2c0,0,0,0,0-0.1c-0.1-0.1-0.2-0.1-0.3-0.2l-9-4c-0.3-0.1-0.6-0.1-0.8,0l-9,4c-0.1,0-0.2,0.1-0.3,0.2c0,0,0,0,0,0.1C2.2,6.4,2.2,6.5,2.1,6.5c0,0,0,0,0,0c0,0,0,0,0,0C2,6.7,2,6.8,2,6.9c0,0,0,0,0,0c0,0,0,0,0,0v10c0,0.4,0.2,0.8,0.6,0.9l9,4c0,0,0,0,0,0C11.7,22,11.9,22,12,22s0.3,0,0.4-0.1c0,0,0,0,0,0l9-4c0.4-0.2,0.6-0.5,0.6-0.9L22,6.9C22,7,22,7,22,6.9C22,7,22,7,22,6.9z M12,4.1L18.5,7L12,9.9L5.5,7L12,4.1z M4,8.5l7,3.1v7.8l-7-3.1V8.5z M13,19.5v-7.8l7-3.1v7.8L13,19.5z" />
        </svg>
    </div>
);

BoxIcon.displayName = 'BoxIcon';

export default IconWrapper(BoxIcon);
