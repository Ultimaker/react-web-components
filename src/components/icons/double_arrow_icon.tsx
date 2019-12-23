import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const DoubleArrowIcon: React.FC<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--double-arrow`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 12" width="11" height="12">
            <path d=" M 5.5 9.2 L 9.5 5.2 L 10.9 6.6 L 6.9 10.6 L 5.5 12 L 0.1 6.6 L 1.5 5.2 L 5.5 9.2 L 5.5 9.2 Z" />
            <path d=" M 5.5 4.2 L 9.5 0.2 L 10.9 1.6 L 6.9 5.6 L 5.5 7 L 0.1 1.6 L 1.5 0.2 L 5.5 4.2 L 5.5 4.2 Z " />
        </svg>
    </div>
);

DoubleArrowIcon.displayName = 'DoubleArrowIcon';

export default IconWrapper(DoubleArrowIcon);
