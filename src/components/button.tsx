import * as React from 'react';
import * as classNames from 'classnames';

import Spinner from './spinner';

export type ButtonType = 'submit' | 'button';
export type ButtonStyle = 'primary' | 'secondary' | 'quiet' | 'circle' | 'pill';

export interface ButtonProps {
  onClickHandler?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  style?: ButtonStyle;
  showSpinner?: boolean;
}

const Button: React.StatelessComponent<ButtonProps> =
  ({ onClickHandler, disabled, type, style, showSpinner, children }) => {

    const classes = classNames(`btn btn--${style}`, { 'disabled': disabled }, { 'waiting': showSpinner });

    const _onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (onClickHandler) {
        onClickHandler();
      }
    }

    return (
      <button className={classes} onClick={_onClickHandler} disabled={disabled || showSpinner} type={type}>
        <span className="text">{children}</span>
        {showSpinner &&
          <Spinner />
        }
      </button>
    );
  };

Button.defaultProps = {
  type: 'button',
  style: 'primary'
};

export default Button;