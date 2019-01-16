import * as React from 'react';

export type FormActionsAlign = 'left' | 'center' | 'right';

export interface FormActionsProps {
    /** The horizontal alignment of the buttons */
    align: FormActionsAlign;
    /** typically the form actions are a list of buttons */
    children: JSX.Element[] | JSX.Element;
}

/**
 * Form actions component that adds the right classes to a list of buttons after a form.
 */
export const FormActions: React.StatelessComponent<FormActionsProps> = ({ align, children }) => {
    const classNames = (`form-actions form-actions--${align}`);

    return (
        <div className={classNames}>
            {React.Children.toArray(children).map((child, index) => child
                && <div key={index} className="form-actions__btn-container">{child}</div>)}
        </div>
    );
};

FormActions.defaultProps = {
    align: 'left',
};

FormActions.displayName = 'FormActions';
export default FormActions;
