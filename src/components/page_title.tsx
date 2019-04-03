import * as React from 'react';
import BetaPill from './beta_pill';

export interface PageTitleProps {
    title: string;
    isBeta?: boolean;
}

export const PageTitle: React.StatelessComponent<PageTitleProps> = (
    { title, isBeta },
): JSX.Element => (
    <div className="page-title">
        <div className="page-title__title-container">
            <h2>
                {title}
                {isBeta && <BetaPill />}
            </h2>
        </div>
    </div>
);

PageTitle.displayName = 'PageTitle';

export default PageTitle;
