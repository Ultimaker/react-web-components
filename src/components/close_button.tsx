import * as React from 'react';

// components
import CrossIcon from './icons/cross_icon';
import { IconColor } from './icons/icon_wrapper';
import Button from './button';

export interface CloseButtonProps {
    /** Called when the Button is clicked */
    onClickHandler: () => void;
    /** Button color */
    color?: IconColor;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
    onClickHandler, color,
}) => {
    const _onClickHandler = (): void => {
        onClickHandler();
    };

    return (
        <Button className="close-button" onClickHandler={_onClickHandler} appearance="quiet" shape="circle">
            <CrossIcon color={color} />
        </Button>
    );
};

CloseButton.displayName = 'CloseButton';

export default CloseButton;
