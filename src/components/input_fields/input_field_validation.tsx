// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Breakpoint, LayoutWidth } from '../../utils/layout_constants';

export interface InputFieldValidationProps {
    /** Message to show for the validation error. Can be any[] if returned from I18n.format */
    validationError: string | any[];
    /** Input field label width: '1/1' | '1/2' | '1/3' | '1/4' | '1/5' */
    labelLayoutWidth: LayoutWidth;
    /** Input field label breakpoint: 'xs' | 'sm' | 'md' | 'lg' */
    labelWidthBreakpoint: Breakpoint;
    /** Displays the required icon when true */
    required?: boolean;
}

export const InputFieldValidation: React.FC<InputFieldValidationProps> = ({
    validationError, labelLayoutWidth, labelWidthBreakpoint, required,
}): JSX.Element => {
    let errorMsgOffsetClass = null;
    let errorMsgClass = '';

    if (labelLayoutWidth !== 'fill' && labelLayoutWidth !== 'fit' && labelLayoutWidth !== '1/1') {
        // align validation message under input (after label width)
        errorMsgOffsetClass = `u-${labelLayoutWidth}-${labelWidthBreakpoint}`;
    } else if (labelLayoutWidth !== '1/1') {
        // align validation message to the right
        errorMsgClass = 'text-right';

        if (required) {
            // offset to the left to allow space for the required icon
            errorMsgClass += ' offset-for-required';
        }
    }

    return (
        <div className="layout__item u-full input-field__validation">
            <div className="layout">
                {errorMsgOffsetClass
                    && <div className={`layout__item ${errorMsgOffsetClass}`} />}
                <div className={`layout__item u-fill ${errorMsgClass}`}>
                    <div className="input-field__error-message">{validationError}</div>
                </div>
            </div>
        </div>
    );
};

InputFieldValidation.displayName = 'InputFieldValidation';

export default InputFieldValidation;
