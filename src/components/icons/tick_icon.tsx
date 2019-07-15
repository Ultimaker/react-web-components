import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const TickIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--tick`}>
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            enableBackground="new 0 0 32 32"
        >
            <g id="Cura-Marketplace--current">
                <g id="A4-Copy-3" transform="translate(-509.000000, -368.000000)">
                    <g id="Group" transform="translate(510.000000, 369.000000)">
                        <g id="Path">
                            <polygon points="10.3,27.1 -0.4,16.4 2.4,13.6 10.3,21.5 27.6,4.3 30.4,7.1" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>

    </div>
);

TickIcon.displayName = 'TickIcon';

export default IconWrapper(TickIcon);
