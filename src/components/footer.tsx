import * as React from 'react';

const Footer: React.StatelessComponent = ({ children }) => {

  return (
    <footer className="app__footer">
      {children}
    </footer>
  );
};

export default Footer;