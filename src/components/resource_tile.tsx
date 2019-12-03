// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Tile from './tile';
import ResourceContextMenu from './resource_context_menu';
import ResourceViewMoreButton from './resource_view_more_button'

import classNames = require('classnames');


export interface Resource {
    resourceId: string;
    title: string;
    imageUrl: string;
    imageAlt?: string;
    className?: string;
    menuItems?: ResourceMenuItem[];
    viewMoreUrl?: string;
    viewMoreIcon?: JSX.Element;
}

export interface ResourceMenuItem {
    label: string;
    handler: (resource: Resource) => any;
    title?: string;
    disabled?: boolean;
    id?: string;
}

export interface ResourceTileProps {
    resource: Resource;
    className?: string;
}

/**
 * The resource tile component display one of the user's clusters or teams in a tile.
 */
export const ResourceTile: React.StatelessComponent<ResourceTileProps> = (
    { resource, className, children },
) => (
    <Tile className={classNames('resource-tile', className)} align="center" id={resource.resourceId}>
        {resource.viewMoreUrl && <ResourceViewMoreButton resource={resource} />}
        {resource.menuItems && <ResourceContextMenu resource={resource} />}
        <img className="resource-tile__image" src={resource.imageUrl} alt={resource.imageAlt} title={resource.imageAlt} />
        <div className="resource-tile__name" title={resource.title}>{resource.title}</div>
        {children}
    </Tile>
);

ResourceTile.displayName = 'ResourceTile';

export default ResourceTile;
