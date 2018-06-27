import * as React from 'react';
import * as classNames from 'classnames';

import Spinner from './spinner';

export type ButtonType = 'submit' | 'button';
export type ButtonStyle = 'primary' | 'secondary' | 'quiet' | 'alert';
export type ButtonShape = 'rectangle' | 'circle' | 'pill';

export interface ButtonProps {
  /** Called when the Button is clicked */
  onClickHandler?: () => void;
  /** Disables the button when true */
  disabled?: boolean;
  /** html button type: 'submit' | 'button' */
  type?: ButtonType;
  /** CSS styling: 'primary' | 'secondary' | 'quiet' | 'alert' */
  style?: ButtonStyle;
  /** Visual shape of the Button: 'rectangle' | 'circle' | 'pill' */
  shape?: ButtonShape;
  /** Replaces the Button text for an SVG spinner when true */
  showSpinner?: boolean;
}

export const Button: React.StatelessComponent<ButtonProps> =
  ({ onClickHandler, disabled, type, style, shape, showSpinner, children }) => {

    const classes = classNames(`btn btn--${style} btn--${shape}`, { 'disabled': disabled }, { 'waiting': showSpinner });

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
  style: 'primary',
  shape: 'rectangle'
};

export default Button;