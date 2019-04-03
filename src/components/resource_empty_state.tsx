// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Button from './button';


export interface ResourceEmptyStateProps {
    text: string;
    imageAlt: string;
    imageUrl: string;
    createButtonText?: string;
    onCreateHandler?: () => void;
}

/**
 * The resource empty tile component displays the empty state for clusters or teams.
 */
export const ResourceEmptyState: React.StatelessComponent<ResourceEmptyStateProps> = ({
    text, imageAlt, imageUrl, onCreateHandler, createButtonText,
}) => (
    <div className="resource-empty-state">
        <img className="resource-empty-state__image" alt={imageAlt} src={imageUrl} />
        <div className="resource-empty-state__text">{text}</div>
        <Button appearance="secondary" onClickHandler={onCreateHandler}>{createButtonText}</Button>
    </div>
);

export default ResourceEmptyState;
