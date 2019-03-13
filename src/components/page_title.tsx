import * as React from 'react';
import BetaPill from './beta_pill';

export interface PageTitleProps {
    title: string;
    isBeta?: boolean;
}

export const PageTitle: React.StatelessComponent<PageTitleProps> = (
    { title, isBeta },
): JSX.Element => (
    <h2 className="page-title">
        {title}
        {isBeta && <BetaPill />}
    </h2>
);

PageTitle.displayName = 'PageTitle';

export default PageTitle;
