import * as React from 'react';
import PageTitle from './page_title';

export interface PageProps {
  title?: string;
  maxWidth?: number|string;
}

const Page: React.StatelessComponent<PageProps> =
  ({ title, maxWidth, children }): JSX.Element => {
    return <div className="page" style={{maxWidth: maxWidth}}>
      {title && <PageTitle title={title}/>}
      {children}
    </div>
  }

Page.defaultProps = {
  maxWidth: "100%"
}

export default Page;
