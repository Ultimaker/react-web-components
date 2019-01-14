// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import UltimakerLogo from './icons/ultimaker_logo';

// utils
import splitTextByNewLine from '../utils/split_text_by_new_line';

export interface GenericFlowPageProps {
    title: string;
    description?: string;
    image?: JSX.Element;
    children: any;
}

export const GenericFlowPage: React.StatelessComponent<GenericFlowPageProps> = ({
    title, description, image, children,
}) => (
    <div className="generic-flow-page">
        <div className="generic-flow-page__logo"><UltimakerLogo /></div>
        {image
            && <div className="generic-flow-page__image">{image}</div>
        }
        <div className="generic-flow-page__title">{title}</div>
        {description
            && <div className="generic-flow-page__description">{splitTextByNewLine(description)}</div>
        }
        <div className="generic-flow-page__content">{children}</div>
    </div>
);

GenericFlowPage.displayName = 'GenericFlowPage';

export default GenericFlowPage;
