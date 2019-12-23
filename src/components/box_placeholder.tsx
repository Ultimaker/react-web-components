import * as React from 'react';

import BoxIcon from './icons/box_icon';

export type BoxPlaceholderBackground = 'light' | 'transparent';

export interface BoxPlaceholderProps {
    /** Size of the placeholder. Include unit */
    size: string;
    /** Background color */
    backgroundColor?: BoxPlaceholderBackground;
}


export const BoxPlaceholder: React.FC<BoxPlaceholderProps> = ({
    size, backgroundColor,
}) => (
    <div
        className={`box-placeholder background--${backgroundColor}`}
        style={{ height: size, width: size }}
    >
        <BoxIcon />
    </div>
);

BoxPlaceholder.defaultProps = {
    backgroundColor: 'transparent',
};

BoxPlaceholder.displayName = 'BoxPlaceholder';

export default BoxPlaceholder;
