import * as React from 'react';
import * as classNames from 'classnames';

import Spinner from './spinner';

export type ButtonType = 'submit' | 'button';

export interface ButtonProps {
  onClickHandler?: (e: React.MouseEvent<HTMLElement>) => void;
  additionalClasses?: string;
  disabled?: boolean;
  type?: ButtonType
  showSpinner?: boolean;
}

const Button: React.StatelessComponent<ButtonProps> =
  ({ onClickHandler, additionalClasses, disabled, type = 'button', showSpinner, children }) => {

    const classes = classNames('btn', { 'disabled': disabled }, { 'waiting': showSpinner }, additionalClasses);

    const _handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (onClickHandler) {
        onClickHandler(e);
      }
    }

    return (
      <button className={classes} onClick={_handleClick} disabled={disabled || showSpinner} type={type}>
        <span className="text">{children}</span>
        {showSpinner &&
          <Spinner />
        }
      </button>
    );
  };

Button.defaultProps = {
  type: 'button'
};

export default Button;