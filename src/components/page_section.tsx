import * as React from 'react';

// components
import Page from './page';

export interface PageSectionProps {
    /** The page section title displayed at the top of the page section */
    title?: string;
    /** The max width of the page section content.
     * The content will be centered horizontally on the page section */
    maxWidth?: number | string;
    /** Optional ID for the button * */
    id?: string;
    /** Additional classes for styling */
    className?: string;
    /** The page section content */
    children: any;
}

/**
 * Page Section is the same as Page, but renamed for syntax reasons.
 * Should be used instead of Page when you want multiple sections.
 */
export const PageSection: React.StatelessComponent<PageSectionProps> = ({
    maxWidth, id, className, children,
}): JSX.Element => (
    <Page
        id={id}
        className={className}
        maxWidth={maxWidth}
    >
        {children}
    </Page>
);

PageSection.displayName = 'PageSection';

export default PageSection;
