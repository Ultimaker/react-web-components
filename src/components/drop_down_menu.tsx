import * as React from 'react';
import classNames from 'classnames';
import { UnmountClosed } from 'react-collapse';

import DropDownMenuItem from './drop_down_menu_item';
import PanelArrow from './panel_arrow';

export type MenuDirection = 'left' | 'right';

export interface DropDownMenuProps {
  /** The list of available options */
  options: SelectOption[];
  /** The value of the selected option */
  activeOptionValue: string | number;
  /** Called when an option is selected */
  onChangeHandler: (value: string | number) => void;
  /** When true the error state will be enabled */
  error?: boolean;
}

export interface SelectOption {
  label: string,
  value: string | number,
  disabled?: boolean
}

export interface DropDownMenuState {
  showMenu: boolean;
}

export class DropDownMenu extends React.Component<DropDownMenuProps, DropDownMenuState> {

  state = {
    showMenu: false
  }

  _setShowMenu(showMenu: boolean): void {
    this.setState({
      showMenu: showMenu
    });
  }

  _getActiveOptionLabel() {
    const { options, activeOptionValue } = this.props;
    const option = options.find(option => option.value === activeOptionValue);

    if (option) {
      return option.label;
    }
    return null;
  }

  _stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  render(): JSX.Element {
    const { error, options, activeOptionValue, onChangeHandler } = this.props;
    const { showMenu } = this.state;

    const dropDownMenuClasses = classNames('drop-down-menu', { 'visible': showMenu });
    const labelClasses = classNames('label', { 'active': showMenu, error });

    return <div className={dropDownMenuClasses} tabIndex={1}
      onClick={this._stopPropagation} onBlur={() => this._setShowMenu(false)}>

      <div className={labelClasses} onClick={() => this._setShowMenu(!showMenu)} >
        <div className="layout layout--align-middle layout--gutter-none">
          <div className="layout__item u-fit">
            <div className="text">{this._getActiveOptionLabel()}</div>
          </div>
          <div className="layout__item u-fit layout__item--right">
            <PanelArrow active={showMenu} width="1.2rem" color="blue" />
          </div>
        </div>
      </div>

      <div className="container" onClick={() => this._setShowMenu(false)}>
        <div ref="menu" className="menu">
          <UnmountClosed isOpened={showMenu} springConfig={{ stiffness: 370, damping: 35 }}>
            <ul>
              {options.map((option, index) => {
                return <DropDownMenuItem key={index} onChangeHandler={onChangeHandler}
                  label={option.label}
                  value={option.value}
                  active={activeOptionValue === option.value}
                  disabled={option.disabled} />
              })}
            </ul>
          </UnmountClosed>
        </div>
      </div>

    </div>
  }
}

export default DropDownMenu;