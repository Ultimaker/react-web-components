import * as React from 'react';
import classNames from 'classnames';

// components
import { DropDownMenuBase, MenuDirection } from './drop_down_menu_base';

export type MenuOffsetDirection = 'left' | 'right';

export interface ContextMenuProps {
    /** Whether the menu should be visible */
    showMenu: boolean;
    /** Callback to toggle showMenu */
    onToggleMenuHandler: (showMenu: boolean) => void;
    /** Width of the menu in pixels */
    menuWidth: number;
    /** Direction to offset the menu: 'left' | 'right' */
    menuOffsetDirection?: MenuOffsetDirection;
    /** Direction to position the menu: 'north' | 'south' */
    menuDirection?: MenuDirection;
    /** Whether the context menu is positioned in a panel, such as a header or footer */
    positionMenuInPanel?: boolean;
    /** The list of menu items */
    children: JSX.Element | JSX.Element[];
}

export interface ContextMenuState {
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

    state = {
        menuOffset: null,
    };

    constructor(props: ContextMenuProps) {
        super(props);
        this._menuRef = React.createRef();
    }

    private _menuRef;

    private _onToggleMenuHandler(showMenu: boolean): void {
        const { onToggleMenuHandler } = this.props;
        onToggleMenuHandler(showMenu);
        this._setMenuOffset();
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

    render(): JSX.Element {
        const {
            menuWidth, menuOffsetDirection, menuDirection, positionMenuInPanel, showMenu, children,
        } = this.props;
        const { menuOffset } = this.state;

        const classes = classNames(
            'context-menu',
            { 'context-menu--panel': positionMenuInPanel },
        );
        const menuStyle = ContextMenu._getMenuStyle(menuOffset, menuOffsetDirection, menuWidth);

        return (
            <div ref={this._menuRef} className={classes}>

                <DropDownMenuBase
                    showMenu={showMenu}
                    triggerElement={<div style={{ width: triggerWidth }} />}
                    menuStyle={menuStyle}
                    onToggleMenuHandler={newShowMenu => this._onToggleMenuHandler(newShowMenu)}
                    menuDirection={menuDirection}
                >
                    {children}
                </DropDownMenuBase>

            </div>
        );
    }
}

export default ContextMenu;
