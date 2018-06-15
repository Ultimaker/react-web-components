import * as React from 'react';
import * as classNames from 'classnames';

export interface DropDownMenuItemProps {
  active: boolean;
  disabled?: boolean;
  onClickHandler: () => void;
  label: string;
}

const DropDownMenuItem: React.StatelessComponent<DropDownMenuItemProps> =
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