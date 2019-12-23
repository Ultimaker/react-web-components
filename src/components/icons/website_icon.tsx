import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const WebsiteIcon: React.FC<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--website`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path d="M25,11.67A12.5,12.5,0,0,0,13.33,0V0H11.67V0A12.5,12.5,0,0,0,0,11.67H0v1.66H0A12.5,12.5,0,0,0,11.67,25v0h1.66v0A12.5,12.5,0,0,0,25,13.33h0V11.67ZM7.83,2.72a13,13,0,0,0-2,4H3.37A10.92,10.92,0,0,1,7.83,2.72ZM2.5,8.33H5.43A18.72,18.72,0,0,0,5,11.67H1.7A10.61,10.61,0,0,1,2.5,8.33Zm-.8,5H5a18.72,18.72,0,0,0,.41,3.34H2.5A10.61,10.61,0,0,1,1.7,13.33Zm1.67,5H5.86a13.44,13.44,0,0,0,2,3.94A10.86,10.86,0,0,1,3.37,18.33Zm8.3,4.9c-1.72-.46-3.19-2.3-4.09-4.9h4.09Zm0-6.56H7.12a18.33,18.33,0,0,1-.44-3.34h5Zm0-5h-5a18.33,18.33,0,0,1,.44-3.34h4.55Zm0-5H7.58c.9-2.6,2.37-4.44,4.09-4.89Zm10,0H19.14a13.5,13.5,0,0,0-2-3.95A11,11,0,0,1,21.63,6.67Zm-8.3-4.89c1.72.45,3.19,2.29,4.09,4.89H13.33Zm0,6.55h4.55a19.25,19.25,0,0,1,.44,3.34h-5Zm0,5h5a18.33,18.33,0,0,1-.44,3.34H13.33Zm0,9.9v-4.9h4.09C16.52,20.93,15.05,22.77,13.33,23.23Zm3.85-1a13.44,13.44,0,0,0,2-3.94h2.49A10.86,10.86,0,0,1,17.18,22.27Zm5.32-5.6H19.57A18.72,18.72,0,0,0,20,13.33H23.3A10.61,10.61,0,0,1,22.5,16.67Zm-2.52-5a18.72,18.72,0,0,0-.41-3.34H22.5a10.61,10.61,0,0,1,.8,3.34Z" />
        </svg>
    </div>
);

WebsiteIcon.displayName = 'WebsiteIcon';

export default IconWrapper(WebsiteIcon);
