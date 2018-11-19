// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import {IconWrapper, IconProps} from './icon_wrapper';

const CircleIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--approved`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" strokeWidth="1" />
        </svg>
    </div>
)

CircleIcon.displayName = "CircleIcon";

export default IconWrapper(CircleIcon);
