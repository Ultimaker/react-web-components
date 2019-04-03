// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Grid from './grid';
import GridItem from './grid_item';
import ResourceEmptyTile from './resource_empty_tile';
import ResourceEmptyState from './resource_empty_state';


export interface ResourceGridProps {
    emptyText: string;
    emptyImageAlt: string;
    emptyImageUrls: [string, string];
    createButtonText: string;
    onCreate: () => void;
}

/**
 * The resource teams component that shows a list of the teams belonging to a resource.
 */
export const ResourceGrid: React.StatelessComponent<ResourceGridProps> = ({
    emptyText, emptyImageUrls, emptyImageAlt, onCreate, createButtonText, children,
}) => {
    if (React.Children.count(children) === 0) {
        return (
            <ResourceEmptyState
                text={emptyText}
                imageUrl={emptyImageUrls[1]}
                imageAlt={emptyImageAlt}
                onCreateHandler={onCreate}
                createButtonText={createButtonText}
            />
        );
    }

    return (
        <div>
            <Grid position="middle" align="center" gutter="md">
                {React.Children.map(children, (child: JSX.Element) => (
                    <GridItem layoutWidth="fit">
                        {child}
                    </GridItem>
                ))}
                <GridItem layoutWidth="fit">
                    <ResourceEmptyTile
                        imageUrl={emptyImageUrls[0]}
                        imageAlt={emptyImageAlt}
                        onCreateHandler={onCreate}
                        createButtonText={createButtonText}
                    />
                </GridItem>
            </Grid>
        </div>
    );
};

ResourceGrid.displayName = 'ResourceTeams';

export default ResourceGrid;
