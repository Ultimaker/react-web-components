import * as React from 'react';

const Footer: React.StatelessComponent = ({ children }) => {

    return (
        <footer className="app__footer">
            {children}
        </footer>
    );
};

Footer.displayName = "Footer";

export default Footer;
