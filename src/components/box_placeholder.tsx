import * as React from 'react';

import BoxIcon from './icons/box_icon';

export interface BoxPlaceholderProps {
    /** Size of the placeholder. Include unit */
    size: string;
}


export const BoxPlaceholder: React.StatelessComponent<BoxPlaceholderProps> = ({ size }) => (
        <div
            className="box-placeholder"
            style={{ height: size, width: size }}
        >
            <BoxIcon />
        </div>
);

BoxPlaceholder.displayName = 'BoxPlaceholder';

export default BoxPlaceholder;
