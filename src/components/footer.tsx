import * as React from 'react';
import { i18nc } from '../utils/i18n';

export interface FooterProps {
  aboutBtnHandler: () => void;
}

const Footer: React.StatelessComponent<FooterProps> = ({ aboutBtnHandler }) => {

  return (
    <footer className="app__footer">
      <a onClick={aboutBtnHandler}>{i18nc("Footer About link", "About")}</a>
    </footer>
  );
};

export default Footer;