import * as React from 'react';

// components
import { Modal, ModalWidth } from './modal';
import ProgressBar from './progress_bar';

export interface PopupBaseProps {
    /** Popup header element, above the header text */
    headerElement?: JSX.Element;
    /** Popup header text */
    headerText?: string;
    /** The width of the popup: 'sm' | 'md' */
    width?: ModalWidth;
    /** The current step number of a multi-step popup */
    step?: number;
    /** The total number of steps of a multi-step popup */
    totalSteps?: number;
    /** The content of the popup */
    children: any;
    /** A component or text to be rendered in the footer of the popup */
    footer?: any;
}

/**
 * The popup base component is a simple modal with a title, content and optionally a progress bar.
 */
export const PopupBase: React.FC<PopupBaseProps> = ({
    headerElement, headerText, step, totalSteps, width, children, footer,
}) => (
    <div className="popup">
        <Modal width={width}>
            <div className="popup__container">
                <div className="popup__content">
                    {headerElement && (
                        <div className="popup__header-element">
                            {headerElement}
                        </div>
                    )}

                    {headerText && (
                        <div className="popup__header">
                            {headerText}
                        </div>
                    )}

                    <div className="popup__body">
                        {children}
                    </div>
                </div>
                {step && totalSteps
                    && <ProgressBar progressPercentage={(step / totalSteps) * 100} barHeight="0.9rem" />}
                {footer && <div className="popup__footer">{footer}</div>}
            </div>
        </Modal>
    </div>
);

PopupBase.defaultProps = {
    width: 'sm',
};

PopupBase.displayName = 'PopupBase';

export default PopupBase;
