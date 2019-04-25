import * as React from 'react';
import { Spring, animated } from 'react-spring';
import classNames from 'classnames';

export interface SlideInPanelHeaderLabels {
    label: string
    info?: string
}

export interface SlideInPanelProps {
    /** Text to be displayed in the panel header */
    headerTitle?: string;
    /** Labels to be displayed on the right side of the panel header */
    headerLabels?: SlideInPanelHeaderLabels[]
    /** The panel will be open when true */
    isOpen: boolean;
    /** Called when the background overlay is clicked */
    onOverlayClickHandler?: Function;
    /** Width of panel. Include unit */
    width?: string;
    /** Show footer */
    includeFooter?: boolean;
    /** Show header */
    includeHeader?: boolean;
}

export class SlideInPanel extends React.Component<SlideInPanelProps, {}> {
    static defaultProps = {
        includeHeader: true,
    }

    componentDidUpdate(prevProps: SlideInPanelProps): void {
        const { isOpen } = this.props;

        if (prevProps.isOpen !== isOpen) {
            if (isOpen) {
                document.body.classList.add('noscroll');
            } else {
                document.body.classList.remove('noscroll');
            }
        }
    }

    componentWillUnmount(): void {
        document.body.classList.remove('noscroll');
    }

    private _handleOverlayClick(e: React.MouseEvent<HTMLDivElement>): void {
        const { onOverlayClickHandler } = this.props;

        e.stopPropagation();

        if (onOverlayClickHandler) {
            onOverlayClickHandler();
        }
    }

    private _renderHeaderLabels() {
        const { headerLabels } = this.props;

        return headerLabels.map((item, index) => (
            <div className="layout__item u-fit" key={index}>
                <div className="header-label">
                    {item.label}
                    {item.info
                        && <span className="header-label__info">{item.info}</span>
                    }
                </div>
            </div>
        ));
    }

    render(): JSX.Element {
        const {
            headerTitle, headerLabels, isOpen, width, includeFooter, includeHeader, children,
        } = this.props;

        const classes = classNames('slide-in-panel', { isOpen });

        return (
            <div className={classes}>
                {/* eslint-disable-next-line */}
                <div className="slide-in-panel__overlay" onClick={e => this._handleOverlayClick(e)} />

                <Spring
                    from={{ x: -100 }}
                    to={{ x: isOpen ? 0 : -100 }}
                    config={{ tension: 370, friction: 35 }}
                >
                    {(props: any) => (
                        <animated.div
                            className="slide-in-panel__container"
                            style={{ right: `${props.x}%`, width, minWidth: width }}
                        >
                            {includeHeader && (
                                <div className="slide-in-panel__header">
                                    <div className="layout">
                                        <div className="layout__item u-fill">
                                            {headerTitle}
                                        </div>
                                        {headerLabels && this._renderHeaderLabels()}
                                    </div>
                                </div>
                            )}
                            <div className="slide-in-panel__content">
                                {children[0] || children}
                            </div>
                            {includeFooter && (
                                <div className="slide-in-panel__footer">
                                    {children[1]}
                                </div>
                            )}
                        </animated.div>
                    )}
                </Spring>

            </div>
        );
    }
}

export default SlideInPanel;
