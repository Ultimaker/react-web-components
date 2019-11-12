/** eslint-disable needed due to the stopPropagation handler on the first div */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import classNames from 'classnames';
import { Spring, animated } from 'react-spring';

// components
import Button from './button';

export type MenuDirection = 'north' | 'south';

export interface DropDownMenuBaseProps {
    /** Whether the menu should be visible */
    showMenu: boolean;
    /** The string or JSX.Element to be shown in the trigger button */
    triggerElement: any;
    /** Direction to position the menu: 'north' | 'south' */
    menuDirection?: MenuDirection;
    /** Style object to be applied to menu */
    menuStyle?: object;
    /** Callback to toggle showMenu */
    onToggleMenuHandler?: (showMenu: boolean) => void;
    /** The list of menu items */
    children: JSX.Element | JSX.Element[];
}

export class DropDownMenuBase extends React.Component<DropDownMenuBaseProps, {}> {
    public static defaultProps: Partial<DropDownMenuBaseProps> = {
        menuDirection: 'south',
    };

    static _stopPropagation(e): void {
        e.stopPropagation();
    }

    private _menuRef;

    constructor(props: DropDownMenuBaseProps) {
        super(props);
        this._menuRef = React.createRef();
        this._onAnywhereClickHandler = this._onAnywhereClickHandler.bind(this);
        this._onToggleMenuHandler = this._onToggleMenuHandler.bind(this);
        this._keyPressHandler = this._keyPressHandler.bind(this);
    }

    private _onAnywhereClickHandler(event): void {
        /* istanbul ignore next */
        if (this._menuRef
            && this._menuRef.current
            && !this._menuRef.current.contains(event.target)) {
            this._onToggleMenuHandler(false);
        }
    }

    private _keyPressHandler(event): void {
        /* istanbul ignore next */
        if (event.key === 'Escape') {
            this._onToggleMenuHandler(false);
        }
    }

    private _onToggleMenuHandler(showMenu: boolean): void {
        const { onToggleMenuHandler } = this.props;

        onToggleMenuHandler(showMenu);

        if (showMenu) {
            document.addEventListener('mousedown', this._onAnywhereClickHandler);
            document.addEventListener('keydown', this._keyPressHandler);
        } else {
            document.removeEventListener('mousedown', this._onAnywhereClickHandler);
            document.removeEventListener('keydown', this._keyPressHandler);
        }
    }


    render(): JSX.Element {
        const {
            triggerElement, menuDirection, menuStyle, showMenu, children,
        } = this.props;

        const classes = classNames(
            'drop-down-menu-base',
            menuDirection ? `drop-down-menu-base--${menuDirection}` : undefined,
            { 'drop-down-menu-base--visible': showMenu },
        );

        return (
            <div
                ref={this._menuRef}
                className={classes}
                onClick={DropDownMenuBase._stopPropagation}
            >

                <Button
                    appearance="no-style"
                    className="drop-down-menu-base__trigger"
                    onClickHandler={() => this._onToggleMenuHandler(!showMenu)}
                >
                    {triggerElement}
                </Button>

                <div className="drop-down-menu-base__menu-container">
                    <div
                        className="drop-down-menu-base__menu"
                        style={menuStyle}
                    >
                        <Spring
                            native
                            from={{ height: 0 }}
                            to={{ height: showMenu ? 'auto' : 0 }}
                            config={{ tension: 370, friction: 35 }}
                        >
                            {(props) => (
                                <animated.div className="spring-container" style={props}>
                                    <ul className="drop-down-menu-base__menu-list">
                                        {children}
                                    </ul>
                                </animated.div>
                            )}
                        </Spring>
                    </div>
                    <div className="drop-down-menu-base__arrow" />

                </div>

            </div>
        );
    }
}

export default DropDownMenuBase;
