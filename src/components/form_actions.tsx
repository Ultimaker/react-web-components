import * as React from 'react'

export interface FormActionsProps {
    /** typically the form actions are a list of buttons **/
    children: JSX.Element[] | JSX.Element;
}

/**
 * Form actions component that adds the right classes to a list of buttons after a form.
 */
export const FormActions: React.StatelessComponent<FormActionsProps> = ({ children }) =>
    <div className="form__actions">
        {React.Children.toArray(children).map((child, index) => child &&
            <div key={index} className="form__btn-container">{child}</div>
        )}
    </div>;

FormActions.displayName = 'FormActions';
export default FormActions;
