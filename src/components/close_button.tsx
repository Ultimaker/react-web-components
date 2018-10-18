import * as React from 'react';

// components
import CrossIcon from './icons/cross_icon';
import { IconColor } from './icons/icon_wrapper';

export interface CloseButtonProps {
    /** Called when the Button is clicked */
    onClickHandler: () => void;
    /** Button color */
    color?: IconColor;
}

export const CloseButton: React.StatelessComponent<CloseButtonProps> = ({ onClickHandler, color }) => {

    const _onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onClickHandler();
    }

    return (
        <div className="close-button" onClick={_onClickHandler}>
            <CrossIcon color={color} />
        </div>
    );
};

CloseButton.displayName = "CloseButton";

export default CloseButton;
