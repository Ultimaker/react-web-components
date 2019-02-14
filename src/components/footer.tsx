import * as React from 'react';

export const Footer: React.StatelessComponent = ({ children }) => (
    <footer className="app__footer">
        {children}
    </footer>
);

Footer.displayName = 'Footer';

export default Footer;
