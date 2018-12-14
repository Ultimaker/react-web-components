import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const PasswordIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--password`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path d="M16.18,10.59H5.41V21.5a1,1,0,0,0,1,1H18.59a1,1,0,0,0,1-1V10.59H16.18ZM14.4,17.68l.36,1.72a1.11,1.11,0,0,1-1,1.2h-2a1.11,1.11,0,0,1-1-1.2l.36-1.72.33-1.58a1.86,1.86,0,0,1-.37-.42,2,2,0,1,1,3.36,0,1.86,1.86,0,0,1-.37.42Z" fill="none" />
            <path d="M16.18,6.59v0A3.89,3.89,0,0,0,12.5,2.5,3.89,3.89,0,0,0,8.82,6.56v2h6.4v-2Z" fill="none" />
            <path d="M14.76,14.6a2,2,0,1,0-3.68,1.08,1.86,1.86,0,0,0,.37.42l-.33,1.58-.36,1.72a1.11,1.11,0,0,0,1,1.2h2a1.11,1.11,0,0,0,1-1.2l-.36-1.72-.33-1.58a1.86,1.86,0,0,0,.37-.42A2,2,0,0,0,14.76,14.6Z" />
            <path d="M20.59,8.59H8.82v-2A3.89,3.89,0,0,1,12.5,2.5a3.89,3.89,0,0,1,3.68,4.06h0a1,1,0,0,0,2,0h0A5.88,5.88,0,0,0,12.5.5,5.88,5.88,0,0,0,6.82,6.56v2H4.41a1,1,0,0,0-1,1V21.5a3,3,0,0,0,3,3H18.59a3,3,0,0,0,3-3V9.59A1,1,0,0,0,20.59,8.59Zm-1,12.91a1,1,0,0,1-1,1H6.41a1,1,0,0,1-1-1V10.59H19.59Z" />
        </svg>
    </div>
);

PasswordIcon.displayName = 'PasswordIcon';

export default IconWrapper(PasswordIcon);
