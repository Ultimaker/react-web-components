import * as React from 'react';

// components
import PopupBase from './popup_base';
import Button from './button';
import FormActions from './form_actions';

export interface AboutDialogProps {
    /** List of open source components used */
    componentsList: OpenSourceComponent[];
    /** Version number of the application */
    versionNumber: string;
    /** Function to close the dialog */
    closeHandler: () => void;
    /** Link text for the support page */
    supportLinkText?: string;
    /** The header for the dialog */
    headerText: string;
    /** The text to be shown before the list of 3rd party packages */
    packagesPreText: string;
    /** The text to be shown before the list of 3rd party package licence */
    licensePreText: string;
    /** The text to be shown before the version number */
    versionPreText: string;
}

export interface OpenSourceComponent {
    name: string;
    license: string;
    url: string;
}

export const AboutDialog: React.StatelessComponent<AboutDialogProps> = ({
    componentsList, versionNumber, closeHandler,
    headerText, packagesPreText, licensePreText, versionPreText,
}) => {
    const licenseList = (): JSX.Element[] => componentsList.map(component => (
        <tr key={component.name}>
            <td className="about-component-name">
                <a href={component.url} target="_blank" rel="noopener noreferrer">{component.name}</a>
            </td>
            <td className="about-component-license">
                <a href={`https://spdx.org/licenses/${component.license}.html`} target="_blank" rel="noopener noreferrer">
                    {`${licensePreText} ${component.license}`}
                </a>
            </td>
        </tr>
    ));

    return (
        <div className="about-dialog">
            <PopupBase headerText={headerText} width="md">
                <p>{`${versionPreText} ${versionNumber}`}</p>
                <p>{packagesPreText}</p>
                <table className="about-components-list">
                    <tbody>
                        {licenseList()}
                    </tbody>
                </table>
                <FormActions>
                    <Button onClickHandler={closeHandler}>Close</Button>
                </FormActions>
            </PopupBase>
        </div>
    );
};

AboutDialog.displayName = 'AboutDialog';

export default AboutDialog;
