import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import classNames = require('classnames');

export type ModalWidth = 'sm' | 'md' | 'lg';

export interface ModalProps {
    /** Called when the background overlay is clicked */
    onOverlayClickHandler?: Function;
    /** The width of the modal: 'sm' | 'md' | 'lg' */
    width?: ModalWidth;
}

export interface ModalState {
    /** The modal will be displayed when true */
    isOpen: boolean;
}

export interface MotionStyle {
    opacity: number;
}

export class Modal extends React.Component<ModalProps, ModalState> {

    state = {
        isOpen: false
    }

    componentDidMount(): void {
        document.body.classList.add('noscroll');

        this.setState({ isOpen: true })
    }

    componentWillUnmount(): void {
        document.body.classList.remove('noscroll');
    }

    _stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
    }

    _handleOverlayClick(e: React.MouseEvent<HTMLDivElement>): void {
        const { onOverlayClickHandler } = this.props;

        this._stopPropagation(e);

        if (onOverlayClickHandler) {
            onOverlayClickHandler();
        }
    }

    _renderModal(key: string, style: MotionStyle): JSX.Element {
        const { width, children } = this.props;

        const classes = classNames('modal__content', width ? `modal__content--${width}` : undefined);

        return (
            <div className="modal" onClick={(e) => this._handleOverlayClick(e)} key={key} style={{ ...style }}>
                <div className={classes} onClick={this._stopPropagation}>
                    {children}
                </div>
            </div>
        );
    }

    _willEnter(): MotionStyle {
        return { opacity: 0 };
    }

    _willLeave(): MotionStyle {
        return { opacity: spring(0) };
    }

    render(): JSX.Element {

        const { isOpen } = this.state;

        const interpolatedStyle = {
            key: 'modal',
            style: { opacity: spring(1, { stiffness: 140, damping: 20 }) },
            data: {}
        }

        return <TransitionMotion
            willEnter={this._willEnter}
            willLeave={this._willLeave}
            styles={isOpen ? [interpolatedStyle] : []}>
            {interpolatedStyles =>
                interpolatedStyles.length ? this._renderModal(interpolatedStyles[0].key, interpolatedStyles[0].style) : null
            }
        </TransitionMotion>
    };
}

export default Modal;
