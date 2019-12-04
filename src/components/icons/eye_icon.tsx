import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const EyeIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--email`}>
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Icons/24/...Eye" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path d="M12,5.99999997 C18.5,5.99999997 21.7,11.3 21.9,11.5 L21.9,11.5 L22.2,12 L21.9,12.5 C21.7,12.7 18.5,18 12,18 C5.49999997,18 2.29999996,12.7 2.09999996,12.5 L2.09999996,12.5 L1.79999996,12 L2.09999996,11.5 C2.29999996,11.3 5.49999997,5.99999997 12,5.99999997 Z M12,7.99999998 C7.69999997,7.99999998 5.09999997,10.8 4.19999997,12 C5.09999997,13.2 7.69999997,16 12,16 C16.3,16 18.9,13.2 19.8,12 C18.9,10.8 16.3,7.99999998 12,7.99999998 Z M12,8.99999999 C13.7,8.99999999 15,10.3 15,12 C15,13.7 13.7,15 12,15 C10.3,15 8.99999999,13.7 8.99999999,12 C8.99999999,10.3 10.3,8.99999999 12,8.99999999 Z M12,11 C11.4,11 11,11.4 11,12 C11,12.6 11.4,13 12,13 C12.6,13 13,12.6 13,12 C13,11.4 12.6,11 12,11 Z" id="Combined-Shape" fill="#000E1A" />
            </g>
        </svg>
    </div>
);

EyeIcon.displayName = 'EyeIcon';

export default IconWrapper(EyeIcon);
