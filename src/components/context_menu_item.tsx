import * as React from 'react';
import * as classNames from 'classnames';

export interface ContextMenuItemProps {
  disabled?: boolean;
  onClickHandler: () => void;
  label: string;
}

const ContextMenuItem: React.StatelessComponent<ContextMenuItemProps> =
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