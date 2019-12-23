import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const SingleArrowIcon: React.FC<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--single-arrow`}>
        <svg viewBox="0 0 11 7">
            <path d=" M 5.5 4.172 L 9.5 0.172 L 10.914 1.586 L 6.914 5.586 L 5.5 7 L 0.086 1.586 L 1.5 0.172 L 5.5 4.172 Z" />
        </svg>
    </div>
);

SingleArrowIcon.displayName = 'SingleArrowIcon';

export default IconWrapper(SingleArrowIcon);
