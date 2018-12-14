import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const CrossIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--cross`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <path d="M12.41,10.81l5.66-5.65a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L11,9.4,5.34,3.74a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l5.66,5.65L3.93,16.47a1,1,0,0,0,1.41,1.41L11,12.23l5.66,5.65a1,1,0,0,0,1.41-1.41Z" />
        </svg>
    </div>
);

CrossIcon.displayName = 'CrossIcon';

export default IconWrapper(CrossIcon);
