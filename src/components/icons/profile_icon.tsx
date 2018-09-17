import * as React from 'react';
import IconWrapper from './icon_wrapper';

export interface Props {
    className?: string;
}

const ProfileIcon: React.StatelessComponent<Props> = ({ className }): JSX.Element => (
    <div className={`${className} icon--profile`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16,3c2.45,0,3.44.44,3.44,4.83,0,2.61-1.57,4.82-3.44,4.82s-3.44-2.21-3.44-4.82C12.56,3.44,13.55,3,16,3m0-3C10.5,0,9.56,3.5,9.56,7.83s2.88,7.82,6.44,7.82,6.44-3.5,6.44-7.82S21.49,0,16,0Z" /><path d="M3.83,27.46v0Z" /><path d="M28.17,27.56v0Z" /><path d="M20.3,19.46A8.13,8.13,0,0,1,16,20.6a8.13,8.13,0,0,1-4.3-1.14c-2.13.48-3.34,1-3.88,1.74-.73,1-.92,3.06-1,5.89v.11c.92.63,3.42,1.8,9.15,1.8s8.22-1.17,9.15-1.8c0-2.87-.23-5-1-6C23.67,20.5,22.44,19.94,20.3,19.46Z" fill="none" /><path d="M28.15,27.28c-.12-7.53-1.1-9.67-8.62-11A4.51,4.51,0,0,1,16,17.6a4.51,4.51,0,0,1-3.53-1.35C5,17.59,4,19.71,3.85,27a4.59,4.59,0,0,1,0,.58v.77S5.62,32,16,32s12.17-3.61,12.17-3.61V27.8h0A4,4,0,0,1,28.15,27.28ZM16,29c-5.73,0-8.23-1.17-9.15-1.8v-.11c.05-2.83.24-4.91,1-5.89.54-.72,1.75-1.26,3.88-1.74A8.13,8.13,0,0,0,16,20.6a8.13,8.13,0,0,0,4.3-1.14c2.14.48,3.37,1,3.89,1.76.73,1,.91,3.11,1,6C24.22,27.83,21.73,29,16,29Z" /></svg>
    </div>
)

ProfileIcon.displayName = "ProfileIcon";

export default IconWrapper(ProfileIcon);
