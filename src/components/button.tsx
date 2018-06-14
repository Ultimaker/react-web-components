import * as React from 'react';
import * as classNames from 'classnames';

import Spinner from './spinner';

export interface ButtonProps {
  onClickHandler?: Function;
  additionalClasses?: string;
  disabled?: boolean;
  submit?: boolean
  showSpinner?: boolean;
}

const Button: React.StatelessComponent<ButtonProps> =
  ({ onClickHandler, additionalClasses, disabled, submit, showSpinner, children }) => {

    const classes = classNames('btn', { 'disabled': disabled }, { 'waiting': showSpinner }, additionalClasses);

    const handleClick = (e) => {
      e.stopPropagation();

      if (onClickHandler) {
        onClickHandler(e);
      }
    }

    return (
      <button className={classes} onClick={handleClick} disabled={disabled || showSpinner} type={submit ? 'submit' : 'button'}>
        <span className="text">{children}</span>
        {showSpinner &&
          <Spinner />
        }
      </button>
    );
  };

export default Button;