// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Grid from './grid';
import GridItem from './grid_item';
import ResourceEmptyTile from './resource_empty_tile';
import ResourceEmptyState from './resource_empty_state';


export interface ResourceGridProps {
    emptyStateText: string;
    emptyStateImageAlt: string;
    emptyStateImageUrl: string;
    emptyTileImageUrl: string;
    emptyTileImageAlt: string;
    createButtonText: string;
    onCreate: () => void;
}

/**
 * The resource teams component that shows a list of the teams belonging to a resource.
 */
export const ResourceGrid: React.StatelessComponent<ResourceGridProps> = ({
    emptyStateText, emptyStateImageUrl, emptyTileImageUrl, emptyTileImageAlt,
    emptyStateImageAlt, onCreate, createButtonText, children,
}) => {
    if (React.Children.count(children) === 0) {
        return (
            <ResourceEmptyState
                text={emptyStateText}
                imageUrl={emptyStateImageUrl}
                imageAlt={emptyStateImageAlt}
                onCreateHandler={onCreate}
                createButtonText={createButtonText}
            />
        );
    }

    return (
        <div>
            <Grid align="center" gutter="md">
                {React.Children.map(children, (child: JSX.Element) => (
                    <GridItem layoutWidth="fit">
                        {child}
                    </GridItem>
                ))}
                <GridItem layoutWidth="fit">
                    <ResourceEmptyTile
                        imageUrl={emptyTileImageUrl}
                        imageAlt={emptyTileImageAlt}
                        onCreateHandler={onCreate}
                        createButtonText={createButtonText}
                    />
                </GridItem>
            </Grid>
        </div>
    );
};

ResourceGrid.displayName = 'ResourceGrid';

export default ResourceGrid;
