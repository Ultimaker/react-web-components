import * as React from 'react';
import * as classNames from 'classnames';
import { UnmountClosed } from 'react-collapse';

export type MenuDirection = 'left' | 'right';

export interface DropDownMenuProps {
  /** The label of the selected menu item */
  label: string | number;
}

export interface DropDownMenuState {
  showMenu: boolean;
}

export class DropDownMenu extends React.Component<DropDownMenuProps, DropDownMenuState> {

  constructor(props: DropDownMenuProps) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  _setShowMenu(showMenu: boolean): void {
    this.setState({
      showMenu: showMenu
    });
  }

  _stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  render(): JSX.Element {

    const { label, children } = this.props;
    const { showMenu } = this.state;

    const dropDownMenuClasses = classNames('drop-down-menu', { 'visible': showMenu });
    const panelArrowClasses = classNames('panel-arrow', { 'active': showMenu });
    const labelClasses = classNames('label', { 'active': showMenu });

    return <div className={dropDownMenuClasses} tabIndex={1}
      onClick={this._stopPropagation} onBlur={() => this._setShowMenu(false)}>

      <div className={labelClasses} onClick={() => this._setShowMenu(!showMenu)} >
        <div className="layout layout--align-middle layout--gutter-none">
          <div className="layout__item u-fit">
            <div className="text">{label}</div>
          </div>
          <div className="layout__item u-fit layout__item--right">
            <img className={panelArrowClasses} src="/static/images/icons/panel-arrow-blue.svg" />
          </div>
        </div>
      </div>

      <div className="container" onClick={() => this._setShowMenu(false)}>
        <div ref="menu" className="menu">
          <UnmountClosed isOpened={showMenu} springConfig={{ stiffness: 370, damping: 35 }}>
            <ul>
              {children}
            </ul>
          </UnmountClosed>
        </div>
      </div>

    </div>
  }
}

export default DropDownMenu;