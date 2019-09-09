// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// utils
import splitTextByNewLine from '../utils/split_text_by_new_line';

export interface GenericFlowPageProps {
    title: string;
    description?: string;
    image?: JSX.Element;
    children?: any;
    appName?: string;
}

export const GenericFlowPage: React.StatelessComponent<GenericFlowPageProps> = ({
    title, description, image, children, appName,
}) => (
    <div className="generic-flow-page">
        <div className="generic-flow-page__header">
            <span className="generic-flow-page__um-text">Ultimaker</span>
            {appName
                && <span className="generic-flow-page__app__name show-sm">{appName}</span>
            }
        </div>
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
