import * as React from 'react';
import { I18n } from '../utils/i18n';

import Button from './button';
import CloseButton from "./close_button";
import Modal from "./modal";
import Tile from "./tile";

export interface AboutDialogProps {
  /** List of open source components used */
  componentsList: OpenSourceComponent[];
  /** Name of the application */
  appName: string;
  /** Version number of the application */
  versionNumber: string;
  /** Dialog will be displayed when true */
  isOpen: boolean;
  /** Function to close the dialog */
  closeHandler: () => void;
  /** URL to a support page */
  supportLinkURL?: string;
  /** Link text for the support page */
  supportLinkText?: string;
}

interface OpenSourceComponent {
  name: string;
  license: string;
  url: string;
}


function licenseList(componentsList: OpenSourceComponent[]): JSX.Element[] {
  return componentsList.map(component => {
    return (<tr key={component.name}>
      <td className="about-component-name"><a href={component.url} target="_blank">{component.name}</a></td>
      <td className="about-component-license"><a href={"https://spdx.org/licenses/" + component.license + ".html"} target="_blank">{I18n.format("About dialog", "license %{license}", { license: component.license })}</a></td>
    </tr>);
  });
}

const AboutDialog: React.StatelessComponent<AboutDialogProps> =
  ({ componentsList, isOpen, versionNumber, closeHandler, appName, supportLinkURL, supportLinkText }) => {

    return (
      <div className="about-dialog">
        <Modal isOpen={isOpen} onOverlayClickHandler={closeHandler}>
          <Tile>
            <div className="about-dialog__header">{I18n.format("About dialog", "About %{appName}", { appName })}</div>
            <p>{I18n.format("About dialog", "Version: %{versionNumber}", { versionNumber })}</p>
            {supportLinkURL &&
              <p>{I18n.translate("About dialog", "For support visit:")}&nbsp;&nbsp;&nbsp;<a href={supportLinkURL} target="_blank">{supportLinkText}</a></p>
            }
            <p>{I18n.format("About dialog", "%{appName} uses the following Open Source components:", { appName })}</p>
            <table className="about-components-list">
              <tbody>
                {licenseList(componentsList)}
              </tbody>
            </table>
            <div className="about-dialog__btn">
              <Button onClickHandler={closeHandler}>Close</Button>
            </div>
          </Tile>
        </Modal>
      </div>
    );
  };

AboutDialog.displayName = "AboutDialog";

export default AboutDialog;
