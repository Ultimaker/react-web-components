import * as React from 'react';
import PageTitle from './page_title';
import classNames = require('classnames');

export interface PageProps {
    title?: string;
    maxWidth?: number | string;
    id?: string;
    className?: string;
}

const Page: React.StatelessComponent<PageProps> =
    ({ title, maxWidth, id, className, children }): JSX.Element =>
        <div id={id} className={classNames("page", className)} style={{ maxWidth: maxWidth }}>
            {title && <PageTitle title={title} />}
            {children}
        </div>;

Page.defaultProps = {
    maxWidth: "100%"
};

Page.displayName = "Page";

export default Page;
