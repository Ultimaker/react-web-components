import * as React from 'react';
import { I18n } from '../utils/i18n';

import Button from './button';
import Modal from "./modal";
import Tile from "./tile";


/**
 * The translated messages for this component.
 */
const T = {
  // translate beforehand
  _aboutApp: I18n.translate("About dialog", "About %{appName}"),
  _license: I18n.translate("About dialog", "license %{license}"),
  _version: I18n.translate("About dialog", "Version: %{versionNumber}"),
  _appUses: I18n.translate("About dialog", "%{appName} uses the following Open Source components:"),

  // only interpolate when needed
  aboutApp: (appName: string) => I18n.interpolate(T._aboutApp, {appName}),
  license: (license: string) => I18n.interpolate(T._license, {license}),
  version: (versionNumber: any) => I18n.interpolate(T._version, {versionNumber}),
  appUses: (appName: string) => I18n.interpolate(T._appUses, {appName}),

  forSupport: I18n.translate("About dialog", "For support visit:"),
}


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
  return componentsList.map(component => (
      <tr key={component.name}>
        <td className="about-component-name">
          <a href={component.url} target="_blank">{component.name}</a>
        </td>
        <td className="about-component-license">
          <a href={"https://spdx.org/licenses/" + component.license + ".html"} target="_blank">
            {T.license(component.license)}
          </a>
        </td>
      </tr>
    )
  );
}

const AboutDialog: React.StatelessComponent<AboutDialogProps> =
  ({ componentsList, isOpen, versionNumber, closeHandler, appName, supportLinkURL, supportLinkText }) => {

    return (
      <div className="about-dialog">
        <Modal isOpen={isOpen} onOverlayClickHandler={closeHandler}>
          <Tile>
            <div className="about-dialog__header">{T.aboutApp(appName)}</div>
            <p>{T.version(versionNumber)}</p>
            {supportLinkURL &&
              <p>{T.forSupport}&nbsp;&nbsp;&nbsp;<a href={supportLinkURL} target="_blank">{supportLinkText}</a></p>
            }
            <p>{T.appUses(appName)}</p>
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
