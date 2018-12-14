import * as React from 'react';
import { UnmountClosed } from 'react-collapse';

import PanelArrow from './panel_arrow';

export type TextAlign = 'left' | 'center' | 'right';

export interface SlideOutContainerProps {
    /** Whether the container should be open */
    isOpen: boolean;
    /** Called when the container header is clicked */
    onHeaderClick?: () => void;
    /**
     * Text to be displayed above the slide out content.
     * May be JSX.Elements in case created by I18n.formatElements
     */
    headerText?: string | JSX.Element[];
    /** The text alignment of the header */
    headerTextAlignment?: TextAlign;
    /** Whether the PanelArrow should be displayed */
    showHeaderPanelArrow?: boolean;
}


export const SlideOutContainer: React.StatelessComponent<SlideOutContainerProps> = ({
    isOpen, headerText, showHeaderPanelArrow, headerTextAlignment, onHeaderClick, children,
}) => (
    <div className="slide-out-container">

        {headerText
                && (
                    <div className="slide-out-container__header" onClick={() => onHeaderClick()}>
                        <div className="layout">
                            <div className="layout__item u-fill" style={{ textAlign: headerTextAlignment }}>
                                {headerText}
                            </div>
                            {showHeaderPanelArrow
                                && (
                                    <div className="layout__item arrow-column">
                                        <PanelArrow active={isOpen} width="1.6rem" />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
        }

        <UnmountClosed isOpened={isOpen}>
            <div className="slide-out-container__body">
                {children}
            </div>
        </UnmountClosed>

    </div>
);

SlideOutContainer.defaultProps = {
    showHeaderPanelArrow: true,
    headerTextAlignment: 'left',
};

SlideOutContainer.displayName = 'SelectListItem';

export default SlideOutContainer;
