import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

// components
import Button from './button';

export type MenuOffsetDirection = 'left' | 'right';
export type MenuDirection = 'north' | 'south';

export interface ContextMenuProps {
    /** Width of the menu in pixels */
    menuWidth: number;
    /** Direction to offset the menu: 'left' | 'right' */
    menuOffsetDirection?: MenuOffsetDirection;
    /** Direction to position the menu: 'north' | 'south' */
    menuDirection?: MenuDirection;
    /** Whether the context menu is positioned in a panel, such as a header or footer */
    positionMenuInPanel?: boolean;
}

export interface ContextMenuState {
    showMenu: boolean;
    menuOffset: number;
}

const menuOffsetDefault = 30;
const triggerWidth = 45;
const windowMargin = 10;

export class ContextMenu extends React.Component<ContextMenuProps, ContextMenuState> {
    public static defaultProps: Partial<ContextMenuProps> = {
        menuOffsetDirection: 'left',
        menuDirection: 'south',
    };

    static _getMenuStyle(
        menuOffset: number,
        menuOffsetDirection: MenuOffsetDirection,
        menuWidth: number,
    ): React.CSSProperties {
        let offset = -menuOffsetDefault;
        let direction: MenuOffsetDirection = 'left';

        if (menuOffset) {
            offset = menuOffset;
        } else if (menuOffsetDirection === 'left') {
            direction = 'right';
        }

        const menuStyle = {
            [direction]: offset,
            width: menuWidth,
        };

        return menuStyle;
    }

    static _stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
    }

    state = {
        showMenu: false,
        menuOffset: null,
    };

    constructor(props: ContextMenuProps) {
        super(props);
        this._menuRef = React.createRef();
        this._onOutsideClickHandler = this._onOutsideClickHandler.bind(this);
        this._setShowMenu = this._setShowMenu.bind(this);
    }

    private _menuRef;

    private _onOutsideClickHandler(event) {
        if (this._menuRef && !this._menuRef.current.contains(event.target)) {
            this._setShowMenu(false);
        }
    }

    private _setMenuOffset(): void {
        const { menuWidth, menuOffsetDirection } = this.props;

        // get browser page width
        const windowWidth = window.innerWidth;

        // get dom element
        const contextMenuElement = this._menuRef.current;

        // get element position
        const contextMenuLeft = contextMenuElement
            ? contextMenuElement.getBoundingClientRect().left : null;

        const leftOffset = menuOffsetDefault - windowMargin;
        const rightOffset = (triggerWidth + menuOffsetDefault) - windowMargin;

        let menuOffset: number = null;

        if (menuOffsetDirection === 'right') {
            // if the menu will appear outside the window on the right side, move it left
            if (contextMenuLeft > windowWidth - (menuWidth - leftOffset)) {
                menuOffset = windowWidth - (contextMenuLeft + menuWidth + windowMargin);
            }
        } else if (menuOffsetDirection === 'left') {
            if (contextMenuLeft - menuWidth < -rightOffset) {
                // if the menu will appear outside the window on the left side, move it right
                menuOffset = windowMargin - contextMenuLeft;
            } else if (contextMenuLeft + rightOffset + windowMargin > windowWidth) {
                // if the menu will appear outside the window on the right side, move it left
                menuOffset = windowWidth - (contextMenuLeft + menuWidth + windowMargin);
            }
        }

        this.setState({
            menuOffset,
        });
    }

    private _setShowMenu(showMenu: boolean): void {
        this._setMenuOffset();

        if (showMenu) {
            document.addEventListener('mousedown', this._onOutsideClickHandler);
        } else {
            document.removeEventListener('mousedown', this._onOutsideClickHandler);
        }

        this.setState({
            showMenu,
        });
    }

    render(): JSX.Element {
        const {
            menuWidth, menuOffsetDirection, menuDirection, positionMenuInPanel, children,
        } = this.props;
        const { showMenu, menuOffset } = this.state;

        const classes = classNames(
            `context-menu context-menu--${menuDirection}`,
            { visible: showMenu },
            { 'context-menu--panel': positionMenuInPanel },
        );
        const menuStyle = ContextMenu._getMenuStyle(menuOffset, menuOffsetDirection, menuWidth);

        return (
            <div ref={this._menuRef} className={classes}>

                <Button style="no-style" onClickHandler={() => this._setShowMenu(!showMenu)}>
                    <div className="trigger" style={{ width: triggerWidth }} />
                </Button>

                <div className="container">
                    <div className="menu" style={menuStyle}>
                        <Collapse
                            isOpened={showMenu}
                            springConfig={{ stiffness: 390, damping: 32 }}
                        >
                            <ul>
                                {React.Children.map(children, (child: JSX.Element) => (
                                    React.cloneElement(child, {
                                        onCloseMenuHandler: () => this._setShowMenu(false),
                                    })
                                ))}
                            </ul>
                        </Collapse>
                    </div>
                </div>

            </div>
        );
    }
}

export default ContextMenu;
