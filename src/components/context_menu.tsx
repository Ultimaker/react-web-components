import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

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

    private menuRef;

    public static defaultProps: Partial<ContextMenuProps> = {
        menuOffsetDirection: 'left',
        menuDirection: 'south'
    };

    state = {
        showMenu: false,
        menuOffset: null
    };

    constructor(props: ContextMenuProps) {
        super(props);
        this.menuRef = React.createRef();
    }

    _setMenuOffset(): void {

        const { menuWidth, menuOffsetDirection } = this.props;

        // get browser page width
        const windowWidth = window.innerWidth;

        // get dom element
        const contextMenuElement = this.menuRef.current;

        // get element position
        const contextMenuLeft = contextMenuElement.getBoundingClientRect().left;

        const leftOffset = menuOffsetDefault - windowMargin;
        const rightOffset = (triggerWidth + menuOffsetDefault) - windowMargin;

        let menuOffset: number;

        if (menuOffsetDirection === 'right') {
            // if the menu will appear outside the window on the right side, move it left
            if (contextMenuLeft > windowWidth - (menuWidth - leftOffset)) {
                menuOffset = windowWidth - (contextMenuLeft + menuWidth + windowMargin);
            }
        }

        else if (menuOffsetDirection === 'left') {
            // if the menu will appear outside the window on the left side, move it right
            if (contextMenuLeft - menuWidth < -rightOffset) {
                menuOffset = windowMargin - contextMenuLeft;
            }
            // if the menu will appear outside the window on the right side, move it left
            else if (contextMenuLeft + rightOffset + windowMargin > windowWidth) {
                menuOffset = windowWidth - (contextMenuLeft + menuWidth + windowMargin);
            }

        }
        else {
            menuOffset = null;
        }

        this.setState({
            menuOffset: menuOffset
        });

    }

    _setShowMenu(showMenu: boolean): void {
        this._setMenuOffset();
        this.setState({
            showMenu: showMenu
        });
    }

    _getMenuStyle(menuOffset: number, menuOffsetDirection: MenuOffsetDirection, menuWidth: number): React.CSSProperties {
        let offset = -menuOffsetDefault;
        let direction: MenuOffsetDirection = 'left';

        if (menuOffset) {
            offset = menuOffset;
        }
        else if (menuOffsetDirection === 'left') {
            direction = 'right';
        }

        const menuStyle = {
            [direction]: offset,
            'width': menuWidth
        }
        return menuStyle;
    }

    _stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation()
    }

    render(): JSX.Element {
        const { menuWidth, menuOffsetDirection, menuDirection, positionMenuInPanel, children } = this.props;
        const { showMenu, menuOffset } = this.state;

        const classes = classNames(`context-menu context-menu--${menuDirection}`, { 'visible': showMenu }, { 'context-menu--panel': positionMenuInPanel });
        const menuStyle = this._getMenuStyle(menuOffset, menuOffsetDirection, menuWidth);

        return <div ref={this.menuRef} className={classes} tabIndex={1}
            onClick={this._stopPropagation} onBlur={() => this._setShowMenu(false)}>

            <div className="trigger" onClick={() => this._setShowMenu(!showMenu)}
                style={{ width: triggerWidth }}></div>

            <div className='container' onClick={() => this._setShowMenu(false)}>
                <div className="menu" style={menuStyle}>
                    <Collapse isOpened={showMenu} springConfig={{ stiffness: 390, damping: 32 }}>
                        <ul>
                            {children}
                        </ul>
                    </Collapse>
                </div>
            </div>

        </div>
    }
}

export default ContextMenu;
