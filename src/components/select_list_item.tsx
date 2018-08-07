import * as React from 'react';
import classNames from 'classnames';

export interface SelectListItemProps {
  /** This should be set to true when the item is selected */
  active: boolean;
  /** Disables the menu item when true */
  disabled?: boolean;
  /** Called when the menu item is clicked */
  onChangeHandler: (value: string | number) => void;
  /** The label for the menu item */
  label: string;
  /** The value of the menu item */
  value: string | number;
}

export const SelectListItem: React.StatelessComponent<SelectListItemProps> =
  ({ active, disabled, onChangeHandler, label, value }) => {

    const _onClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
      if(disabled){
        e.stopPropagation();
      }
      else{
        onChangeHandler(value);
      }
    }

    return <li className={classNames({ disabled, active })} onClick={_onClickHandler}>
      {label}
    </li>

  };

export default SelectListItem;