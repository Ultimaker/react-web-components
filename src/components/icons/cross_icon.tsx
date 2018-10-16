import * as React from 'react';
import {IconWrapper, IconProps} from './icon_wrapper';

const CrossIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--rejected`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="9 9 14 14">
            <polygon points="11.4 22.72 16 18.12 20.6 22.72 22.72 20.6 18.12 16 22.72 11.4 20.6 9.28 16 13.88 11.4 9.28 9.28 11.4 13.88 16 9.28 20.6 11.4 22.72" />
        </svg>
    </div>
)

CrossIcon.displayName = "CrossIcon";

export default IconWrapper(CrossIcon);
