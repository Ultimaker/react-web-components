import * as React from 'react';

export interface PageTitleProps {
  title: string;
}

const PageTitle: React.StatelessComponent<PageTitleProps> =
  ({ title }): JSX.Element => {

    return <h2 className="page-title">{title}</h2>
  }

PageTitle.displayName = "PageTitle";

export default PageTitle;
