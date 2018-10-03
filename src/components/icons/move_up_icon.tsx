import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const MoveUpIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--move-up`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect width="22" height="2" rx="1" ry="1" />
            <path d="M11,5l9,5.29H16.25V20H5.45V10.29H2L11,5m0-2a1.93,1.93,0,0,0-1,.28L1,8.57a2,2,0,0,0,1,3.72H3.45V20a2,2,0,0,0,2,2h10.8a2,2,0,0,0,2-2V12.29H20a2,2,0,0,0,1-3.72L12,3.28A1.93,1.93,0,0,0,11,3Z" />
        </svg>
    </div>
)

MoveUpIcon.displayName = "MoveUpIcon";

export default IconWrapper(MoveUpIcon);
