import * as React from 'react';
import PageTitle from './page_title';

export interface PageProps {
  title?: string;
  maxWidth?: number|string;
  id?: string;
}

const Page: React.StatelessComponent<PageProps> =
  ({ title, maxWidth, id, children }): JSX.Element => {
    return <div id={id} className="page" style={{maxWidth: maxWidth}}>
      {title && <PageTitle title={title}/>}
      {children}
    </div>
  }

Page.defaultProps = {
  maxWidth: "100%"
}

Page.displayName = "Page";

export default Page;
