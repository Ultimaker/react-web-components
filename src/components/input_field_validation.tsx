import * as React from 'react';

export type LayoutWidth = '1/1' | '1/2' | '1/3' | '1/4' | '1/5' | 'fit' | 'fill';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface InputFieldValidationProps {
  /** Message to show for the validation error */
  validationError: string;
  /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
  labelLayoutWidth: LayoutWidth;
  /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
  labelWidthBreakpoint: Breakpoint;
  /** Displays the required icon when true */
  required?: boolean
}

export class InputFieldValidation extends React.Component<InputFieldValidationProps, {}> {

  render(): JSX.Element {
    const { validationError, labelLayoutWidth, labelWidthBreakpoint, required } = this.props;
    let errorMsgOffsetClass = null;
    let errorMsgClass = null;

    if (labelLayoutWidth !== 'fill' && labelLayoutWidth !== 'fit' && labelLayoutWidth !== '1/1') {
      // align validation message under input (after label width)
      errorMsgOffsetClass = `u-${labelLayoutWidth}-${labelWidthBreakpoint}`;
    }
    else if (labelLayoutWidth !== '1/1') {
      // align validation message to the right
      errorMsgClass = 'text-right';

      if (required) {
        // offset to the left to allow space for the required icon
        errorMsgClass += ' offset-for-required';
      }
    }

    return <div className="layout__item u-full input-field__validation">
      <div className="layout">
        {errorMsgOffsetClass &&
          <div className={`layout__item ${errorMsgOffsetClass}`}></div>
        }
        <div className={`layout__item u-fill ${errorMsgClass}`}>
          <div className="input-field__error-message">{validationError}</div>
        </div>
      </div>
    </div>
  };
};

export default InputFieldValidation;
