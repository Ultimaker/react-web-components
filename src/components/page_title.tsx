import * as React from 'react';
import BetaPill from './beta_pill'

export interface PageTitleProps {
    title: string;
    is_beta?: boolean;
}

export const PageTitle: React.StatelessComponent<PageTitleProps> = ({ title, is_beta }): JSX.Element =>
    <h2 className="page-title">
        {title}
        {is_beta && <BetaPill />}
    </h2>;

PageTitle.displayName = 'PageTitle';

export default PageTitle;
