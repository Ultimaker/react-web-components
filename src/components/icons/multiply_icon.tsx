import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const MultiplyIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--multiply`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <path d="M20,0H8A2,2,0,0,0,6,2V3H5A2,2,0,0,0,3,5V6H2A2,2,0,0,0,0,8V20a2,2,0,0,0,2,2H14a2,2,0,0,0,2-2V19H17a2,2,0,0,0,2-2V16h1a2,2,0,0,0,2-2V2A2,2,0,0,0,20,0ZM14,20H2V8H14V20ZM17,17H16V8a2,2,0,0,0-2-2H5V5H17V17Zm3-3H19V5a2,2,0,0,0-2-2H8V2H20Z" />
        </svg>
    </div>
)

MultiplyIcon.displayName = "MultiplyIcon";

export default IconWrapper(MultiplyIcon);
