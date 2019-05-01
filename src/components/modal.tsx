import * as React from 'react';
import { Transition } from 'react-spring';

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
    /** Random id for the instance of the component */
    id: number;
}

export interface OpacityStyle {
    opacity: number;
}

export class Modal extends React.Component<ModalProps, ModalState> {
    static _stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
    }

    state = {
        isOpen: false,
        id: Math.floor(Math.random() * 10000000000),
    }

    componentDidMount(): void {
        const { id } = this.state;
        document.body.classList.add(`noscroll-${id}`);
        this.setState({ isOpen: true });
    }

    componentWillUnmount(): void {
        const { id } = this.state;
        document.body.classList.remove(`noscroll-${id}`);
    }

    _handleOverlayClick(e: React.MouseEvent<HTMLDivElement>): void {
        const { onOverlayClickHandler } = this.props;

        Modal._stopPropagation(e);

        if (onOverlayClickHandler) {
            onOverlayClickHandler();
        }
    }

    _renderModal(style: OpacityStyle): JSX.Element {
        const { width, children } = this.props;

        const classes = classNames('modal__content', width ? `modal__content--${width}` : undefined);

        return (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
                className="modal"
                onClick={e => this._handleOverlayClick(e)}
                style={style}
            >
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <div className={classes} role="dialog" onClick={Modal._stopPropagation}>
                    {children}
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        const { isOpen } = this.state;

        return (
            <Transition
                items={isOpen}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
            >
                {show => show && (props => this._renderModal(props))}
            </Transition>
        );
    }
}

export default Modal;
