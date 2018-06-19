import * as React from 'react';
import * as classNames from 'classnames';

export interface DropDownMenuItemProps {
  /** This should be set to true when the item is selected */
  active: boolean;
  /** Disables the menu item when true */
  disabled?: boolean;
  /** Called when the menu item is clicked */
  onClickHandler: () => void;
  /** The label for the menu item */
  label: string;
}

export const DropDownMenuItem: React.StatelessComponent<DropDownMenuItemProps> =
  ({ active, disabled, onClickHandler, label }) => {

    const _onClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
      if(disabled){
        e.stopPropagation();
      }
      else{
        onClickHandler();
      }
    }

    return <li className={classNames({ disabled, active })} onClick={_onClickHandler}>
      {label}
    </li>

  };

export default DropDownMenuItem;