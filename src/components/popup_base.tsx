import * as React from 'react';

// components
import { Modal, ModalWidth } from './modal';
import ProgressBar from './progress_bar';

export interface PopupBaseProps {
    /** Popup header text */
    headerText: string;
    /** The width of the popup: 'sm' | 'md' */
    width?: ModalWidth;
    /** The current step number of a multi-step popup */
    step?: number;
    /** The total number of steps of a multi-step popup */
    totalSteps?: number;
    /** The content of the popup **/
    children: any
}

/**
 * The popup base component is a simple modal with a title, content and optionally a progress bar.
 */
export const PopupBase: React.StatelessComponent<PopupBaseProps> = (
    { headerText, step, totalSteps, width, children }
) =>
    <div className="popup">
        <Modal width={width}>
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        {headerText}
                    </div>

                    <div className="popup__body">
                        {children}
                    </div>
                </div>
                {step && totalSteps &&
                    <ProgressBar progressPercentage={step / totalSteps * 100} barHeight="0.9rem" />
                }
            </div>
        </Modal>
    </div>;

PopupBase.defaultProps = {
    width: 'sm',
};

PopupBase.displayName = 'popupBase';

export default PopupBase;
