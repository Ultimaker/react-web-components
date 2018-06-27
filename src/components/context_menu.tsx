import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { Collapse } from 'react-collapse';

export type MenuDirection = 'left' | 'right';

export interface ContextMenuProps {
  /** Width of the menu in pixels */
  menuWidth: number;
  /** Direction to position the menu: 'left' | 'right' */
  menuOffsetDirection: MenuDirection;
}

export interface ContextMenuState {
  showMenu: boolean;
  menuOffset: number;
}

const menuOffsetDefault = 30;
const triggerWidth = 45;
const windowMargin = 10;

export class ContextMenu extends React.Component<ContextMenuProps, ContextMenuState> {

  constructor(props: ContextMenuProps) {
    super(props);
    this.state = {
      showMenu: false,
      menuOffset: null
    };

    this._setmenuOffset = this._setmenuOffset.bind(this);
  }

  componentDidMount(): void {
    this._setmenuOffset();
    window.addEventListener("resize", this._setmenuOffset);
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this._setmenuOffset);
  }

  _setmenuOffset(): void {

    const { menuWidth, menuOffsetDirection } = this.props;

    // get browser page width
    const windowWidth = window.innerWidth;

    // get dom element
    const contextMenuElement = ReactDOM.findDOMNode(this.refs.contextMenu);

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
    this.setState({
      showMenu: showMenu
    });
  }

  _getMenuStyle(menuOffset: number, menuOffsetDirection: MenuDirection, menuWidth: number): React.CSSProperties {
    let offset = -menuOffsetDefault;
    let direction: MenuDirection = 'left';

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

    const { menuWidth, menuOffsetDirection, children } = this.props;
    const { showMenu, menuOffset } = this.state;

    const classes = classNames('context-menu', { 'visible': showMenu });
    const menuStyle = this._getMenuStyle(menuOffset, menuOffsetDirection, menuWidth);

    return <div ref="contextMenu" className={classes} tabIndex={1}
      onClick={this._stopPropagation} onBlur={() => this._setShowMenu(false)}>

      <div className="trigger" onClick={() => this._setShowMenu(!showMenu)}
        style={{ width: triggerWidth }}></div>

      <div className='container' onClick={() => this._setShowMenu(false)}>
        <div ref="menu" className="menu" style={menuStyle}>
          <Collapse isOpened={showMenu} springConfig={{ stiffness: 370, damping: 35 }}>
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