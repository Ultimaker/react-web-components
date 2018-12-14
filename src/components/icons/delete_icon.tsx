import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const DeleteIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
    <div className={`${className} icon--delete`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width="22" height="22">
            <path d=" M 21 4 L 16 4 L 15.1 1.3 C 14.8 0.5 14 0 13.2 0 L 8.8 0 C 8 0 7.2 0.5 6.9 1.3 L 6 4 L 1 4 C 0.4 4 0 4.4 0 5 C 0 5.6 0.4 6 1 6 L 2.5 6 L 2.5 20 C 2.5 21.1 3.4 22 4.5 22 L 17.6 22 C 18.7 22 19.5 21.1 19.6 20 L 19.6 6 L 21 6 C 21.6 6 22 5.6 22 5 C 22 4.4 21.6 4 21 4 Z  M 8.8 2 L 13.1 2 L 13.8 4 L 8.1 4 L 8.8 2 L 8.8 2 Z  M 17.5 20.1 L 4.4 20.1 L 4.4 6 L 17.5 6 L 17.5 20.1 L 17.5 20.1 Z " />
            <path d=" M 7 7.5 C 6.4 7.5 6 7.9 6 8.3 L 6 17.6 C 6 18.1 6.4 18.4 7 18.4 C 7.6 18.4 8 18 8 17.6 L 8 8.4 C 8 7.9 7.6 7.5 7 7.5 Z " />
            <path d=" M 11 7.5 C 10.4 7.5 10 7.9 10 8.3 L 10 17.6 C 10 18.1 10.4 18.4 11 18.4 C 11.6 18.4 12 18 12 17.6 L 12 8.4 C 12 7.9 11.6 7.5 11 7.5 Z " />
            <path d=" M 15 7.5 C 14.4 7.5 14 7.9 14 8.3 L 14 17.6 C 14 18.1 14.4 18.4 15 18.4 C 15.6 18.4 16 18 16 17.6 L 16 8.4 C 16 7.9 15.6 7.5 15 7.5 Z " />
        </svg>
    </div>
);

DeleteIcon.displayName = 'DeleteIcon';

export default IconWrapper(DeleteIcon);
