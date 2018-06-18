import * as React from 'react';
import * as classNames from 'classnames';

export interface ContextMenuItemProps {
  /** Disables the menu item when true */
  disabled?: boolean;
  /** Called when the Button is clicked */
  onClickHandler: () => void;
  /** Label for the menu item */
  label: string;
}

export const ContextMenuItem: React.StatelessComponent<ContextMenuItemProps> =
  ({ disabled, onClickHandler, label }) => {

    const _onClickHandler = (e) => {
      if(disabled){
        e.stopPropagation();
      }
      else{
        onClickHandler();
      }
    }

    return <li className={classNames({ disabled })} onClick={_onClickHandler}>
      {label}
    </li>

  };

export default ContextMenuItem;