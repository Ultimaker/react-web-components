// Copyright (c) 2019 Ultimaker B.V.
import * as React from 'react';

import { Icons } from './icons';
import { I18n } from '../utils/i18n';

export interface ResourceViewMoreLinkProps {
    url: string;
    icon: string;
}

/**
 * The resource context menu component displays a menu
 * that allows the user to execute extra actions for a resource.
 */
const ResourceViewMoreLink: React.StatelessComponent<ResourceViewMoreLinkProps> = (props: ResourceViewMoreLinkProps): JSX.Element => {
    const { icon, url } = props;
    return (
        <a className="resource-view-more-link" href={url}>
            <span className="visually-hidden">{I18n.translate('View more information link', 'View More')}</span>
            {Icons[icon]()}
        </a>
    );
};

ResourceViewMoreLink.displayName = 'ResourceViewMoreLink';

export default ResourceViewMoreLink;
