import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

/** this icon works a bit differently than the rest
 * when it's color is modified, it's affecting the 'i' letter in the inside
 * the color of the surrounding disc is colored by overwriting the background attribute
 * of the icon--info-circular class
*/
const InfoCircularIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--info-circular`}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <path d="M12,14.5v-5a1,1,0,0,0-1-1H10a1,1,0,0,0,0,2v4a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" />
            <circle cx="11" cy="6.5" r="1" />
        </svg>
    </div>
);

InfoCircularIcon.displayName = 'InfoCircularIcon';

export default IconWrapper(InfoCircularIcon);
