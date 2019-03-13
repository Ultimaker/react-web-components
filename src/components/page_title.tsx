import * as React from 'react';

export interface PageTitleProps {
    title: string | JSX.Element;
}

export const PageTitle: React.StatelessComponent<PageTitleProps> = ({ title }): JSX.Element => (
    <h2 className="page-title">{title}</h2>
);

PageTitle.displayName = 'PageTitle';

export default PageTitle;
