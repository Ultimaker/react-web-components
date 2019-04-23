import * as React from 'react';
import { Spring, animated } from 'react-spring';

// components
import Button from './button';
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
    headerText?: string | JSX.Element | JSX.Element[];
    /** The text alignment of the header */
    headerTextAlignment?: TextAlign;
    /** Whether the PanelArrow should be displayed */
    showHeaderPanelArrow?: boolean;
    /** Width of the arrow, including unit */
    panelArrowWidth?: string;
}


export const SlideOutContainer: React.StatelessComponent<SlideOutContainerProps> = ({
    isOpen, headerText, showHeaderPanelArrow, headerTextAlignment,
    panelArrowWidth, onHeaderClick, children,
}) => (
    <div className="slide-out-container">

        {headerText && (
            <Button
                appearance="no-style"
                className="slide-out-container__header"
                onClickHandler={() => onHeaderClick()}
            >
                <div className="layout layout--align-middle">
                    <div className="layout__item u-fill" style={{ textAlign: headerTextAlignment }}>
                        {headerText}
                    </div>
                    {showHeaderPanelArrow && (
                        <div className="layout__item u-fit arrow-column">
                            <PanelArrow active={isOpen} width={panelArrowWidth} />
                        </div>
                    )}
                </div>
            </Button>
        )}

        <Spring
            from={{ height: 0 }}
            to={{ height: isOpen ? 'auto' : 0 }}
            config={{ tension: 370, friction: 35 }}
        >
            {props => (
                <animated.div className="spring-container" style={props}>
                    <div className="slide-out-container__body">
                        {children}
                    </div>
                </animated.div>
            )}
        </Spring>

    </div>
);

SlideOutContainer.defaultProps = {
    showHeaderPanelArrow: true,
    headerTextAlignment: 'left',
    panelArrowWidth: '1.6rem',
};

SlideOutContainer.displayName = 'SelectListItem';

export default SlideOutContainer;
