import React from 'react';
import classNamesDedupe from 'classnames/dedupe';

const INPUT_TEXT_CLASSNAME = 'input-text';
const INPUT_TEXT_ERROR_CLASSNAME = 'input-text--error';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    // prevent creating radio buttons and checkboxes
    type?: 'text' | 'password' | 'email' | 'url' | 'number';
}

const InputText = React.forwardRef(
    (props: InputTextProps, ref: React.Ref<HTMLInputElement>) => {
        const {
            className: extraClassName, hasError, type, value, ...restProps
        } = props;
        const className = classNamesDedupe(
            INPUT_TEXT_CLASSNAME,
            { [INPUT_TEXT_ERROR_CLASSNAME]: hasError },
            extraClassName,
        );
        return (
            <input
                type={type}
                className={className}
                value={value}
                ref={ref}
                {...restProps}
            />
        );
    },
);

InputText.defaultProps = {
    hasError: false,
    type: 'text',
};

export { InputText };
