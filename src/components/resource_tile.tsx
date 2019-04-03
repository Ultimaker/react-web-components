// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Tile from './tile';
import ResourceContextMenu from './resource_context_menu';

import classNames = require('classnames');


export interface Resource {
    resourceId: string;
    title: string;
    imageUrl: string;
    imageAlt?: string;
    className?: string;
    menuItems?: ResourceMenuItem[];
}

export interface ResourceMenuItem {
    title: string;
    handler: (resource: Resource) => any;
    tooltip?: string;
    disabled?: boolean;
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
    <Tile className={classNames('resource-tile', className)} align="center">
        {resource.menuItems && <ResourceContextMenu resource={resource} />}
        <img className="resource-tile__image" src={resource.imageUrl} alt={resource.imageAlt} title={resource.imageAlt} height={98} />
        <div className="resource-tile__name" title={resource.title}>{resource.title}</div>
        {children}
    </Tile>
);

ResourceTile.displayName = 'ResourceTile';

export default ResourceTile;
