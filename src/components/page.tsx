import * as React from 'react';
import PageTitle from './page_title';

export interface PageProps {
  title?: string;
  maxWidth?: number|string;
  className?: string;
}

const Page: React.StatelessComponent<PageProps> =
  ({ title, maxWidth, className, children }): JSX.Element => {
    return <div className={"page " + (className || "")} style={{maxWidth: maxWidth}}>
      {title && <PageTitle title={title}/>}
      {children}
    </div>
  }

Page.defaultProps = {
  maxWidth: "100%"
}

export default Page;
