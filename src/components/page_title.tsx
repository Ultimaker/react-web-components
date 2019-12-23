import * as React from 'react';
import BetaPill from './beta_pill';

export type PageTitleAlign = 'left' | 'center' | 'right';

export interface PageTitleProps {
    title: string;
    isBeta?: boolean;
    align?: PageTitleAlign
}

export const PageTitle: React.FC<PageTitleProps> = (
    { title, isBeta, align },
): JSX.Element => (
    <div className="page-title" style={{ textAlign: align }}>
        <div className="page-title__title-container">
            <h2>
                {title}
                {isBeta && <BetaPill />}
            </h2>
        </div>
    </div>
);

PageTitle.defaultProps = {
    align: 'center',
};

PageTitle.displayName = 'PageTitle';

export default PageTitle;
