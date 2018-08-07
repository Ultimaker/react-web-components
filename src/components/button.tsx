import * as React from 'react';
import classNames from 'classnames';

import Spinner from './spinner';

export type ButtonType = 'submit' | 'button' | 'link';
export type ButtonStyle = 'primary' | 'secondary' | 'quiet' | 'alert';
export type ButtonShape = 'rectangle' | 'circle' | 'pill';

export interface ButtonProps {
  /** Optional ID for the button **/
  id?: string;
  /** Called when the Button is clicked */
  onClickHandler?: () => void;
  /** Disables the button when true */
  disabled?: boolean;
  /** html button type: 'submit' | 'button' | 'link' */
  type?: ButtonType;
  /** CSS styling: 'primary' | 'secondary' | 'quiet' | 'alert' */
  style?: ButtonStyle;
  /** Visual shape of the Button: 'rectangle' | 'circle' | 'pill' */
  shape?: ButtonShape;
  /** Replaces the Button text for an SVG spinner when true */
  showSpinner?: boolean;
  /** URL to link to for type link */
  linkURL?: string;
  /** If true button of type link will open in a new tab */
  linkToNewTab?: boolean;
}

export const Button: React.StatelessComponent<ButtonProps> =
  ({ id, onClickHandler, disabled, type, style, shape, showSpinner, linkURL, linkToNewTab, children }) => {

    const classes = classNames(`btn btn--${style} btn--${shape}`, { 'disabled': disabled }, { 'waiting': showSpinner });

    const _onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
      if (onClickHandler) {
        e.stopPropagation();
        onClickHandler();
      }
    }

    if (type === 'link') {
      return <a id={id} className={classes} href={disabled || showSpinner ? null : linkURL} target={linkToNewTab ? '_blank' : null}>
        <span className="text">{children}</span>
        {showSpinner &&
          <Spinner />
        }
      </a>
    }
    else {
      return <button id={id} className={classes} onClick={_onClickHandler} disabled={disabled || showSpinner} type={type}>
        <span className="text">{children}</span>
        {showSpinner &&
          <Spinner />
        }
      </button>
    }
  };

Button.defaultProps = {
  type: 'button',
  style: 'primary',
  shape: 'rectangle',
  linkToNewTab: false
};

Button.displayName = "Button";

export default Button;
