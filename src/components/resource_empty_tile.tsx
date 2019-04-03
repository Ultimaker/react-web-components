// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Tile from './tile';
import Button from './button';


export interface ResourceEmptyTileProps {
    imageAlt: string;
    imageUrl: string;
    createButtonText?: string;
    onCreateHandler?: () => void;
}

/**
 * The resource empty tile component displays the empty state for clusters or teams.
 */
export const ResourceEmptyTile: React.StatelessComponent<ResourceEmptyTileProps> = ({
    imageAlt, imageUrl, onCreateHandler, createButtonText,
}) => (
    <Tile className="resource-tile resource-tile__empty" align="center" appearance="dashed">
        <img className="resource-tile__image" alt={imageAlt} src={imageUrl} height={90} />
        <Button appearance="secondary" onClickHandler={onCreateHandler}>{createButtonText}</Button>
    </Tile>
);

export default ResourceEmptyTile;
