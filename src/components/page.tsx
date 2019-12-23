import * as React from 'react';

// components
import { PageTitle, PageTitleAlign } from './page_title';

import classNames = require('classnames');

export interface PageProps {
    /** The page title displayed at the top of the page */
    title?: string;
    /** Whether a beta pill should be displayed next to the page title */
    isBeta?: boolean;
    /** The max width of the page content. The content will be centered horizontally on the page */
    maxWidth?: number | string;
    /** Optional ID for the button */
    id?: string;
    /** Additional classes for styling */
    className?: string;
    /** How to align the page title */
    titleAlign?: PageTitleAlign;
    /** The page content */
    children?: any;
}

export const Page: React.FC<PageProps> = ({
    title, isBeta, maxWidth, id, className, titleAlign, children,
}): JSX.Element => (
    <div id={id} className={classNames('page', className)}>
        <div className="page__content" style={{ maxWidth }}>
            {title && <PageTitle title={title} isBeta={isBeta} align={titleAlign} />}
            {children}
        </div>
    </div>
);

Page.displayName = 'Page';

export default Page;
