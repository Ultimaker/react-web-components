// Copyright (c) 2019 Ultimaker B.V.
import * as React from 'react';

export interface ResourceViewMoreLinkProps {
    url: string;
    icon: JSX.Element;
}

/**
 * The resource context menu component displays a menu
 * that allows the user to execute extra actions for a resource.
 */
const ResourceViewMoreLink: React.StatelessComponent<ResourceViewMoreLinkProps> = (props: ResourceViewMoreLinkProps): JSX.Element => {
    const { icon, url } = props;
    return (
        <a className="resource-view-more-link" href={url}>
            {icon}
        </a>
    );
};

ResourceViewMoreLink.displayName = 'ResourceViewMoreLink';

export default ResourceViewMoreLink;
