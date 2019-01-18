import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

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

    constructor(props: DropDownMenuBaseProps) {
        super(props);
        this._menuRef = React.createRef();
        this._onOutsideFocusHandler = this._onOutsideFocusHandler.bind(this);
        this._onToggleMenuHandler = this._onToggleMenuHandler.bind(this);
    }

    private _menuRef;

    private _onOutsideFocusHandler(event): void {
        if (this._menuRef
            && this._menuRef.current
            && !this._menuRef.current.contains(event.target)) {
            this._onToggleMenuHandler(false);
        }

        if (event.key === 'Escape') {
            // close menu is user presses escape
            this._onToggleMenuHandler(false);
        }
    }

    private _onToggleMenuHandler(showMenu: boolean): void {
        const { onToggleMenuHandler } = this.props;

        onToggleMenuHandler(showMenu);

        if (showMenu) {
            document.addEventListener('mousedown', this._onOutsideFocusHandler);
            document.addEventListener('keydown', this._onOutsideFocusHandler);
        } else {
            document.removeEventListener('mousedown', this._onOutsideFocusHandler);
            document.removeEventListener('keydown', this._onOutsideFocusHandler);
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
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
                ref={this._menuRef}
                className={classes}
                onClick={DropDownMenuBase._stopPropagation}
            >

                <Button appearance="no-style" className="drop-down-menu-base__trigger" onClickHandler={() => this._onToggleMenuHandler(!showMenu)}>
                    {triggerElement}
                </Button>

                <div className="drop-down-menu-base__menu-container">
                    <div className="drop-down-menu-base__menu" style={menuStyle}>
                        <Collapse
                            isOpened={showMenu}
                            springConfig={{ stiffness: 370, damping: 35 }}
                        >
                            <ul className="drop-down-menu-base__menu-list">
                                {children}
                            </ul>
                        </Collapse>
                    </div>
                    <div className="drop-down-menu-base__arrow" />
                </div>

            </div>
        );
    }
}

export default DropDownMenuBase;
