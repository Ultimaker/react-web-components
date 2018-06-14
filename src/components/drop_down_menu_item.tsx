import * as React from 'react';
import * as classNames from 'classnames';

export interface DropDownMenuItemProps {
  active: boolean;
  disabled?: boolean;
  onClickHandler: () => void;
}

const DropDownMenuItem: React.StatelessComponent<DropDownMenuItemProps> =
  ({ active, disabled, onClickHandler, children }) => {

    const _handleClick = (e) => {
      if(disabled){
        e.stopPropagation();
      }
      else{
        onClickHandler();
      }
    }

    return <li className={classNames({ disabled, active })} onClick={_handleClick}>
      {children}
    </li>

  };

export default DropDownMenuItem;