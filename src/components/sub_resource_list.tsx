// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import MorePill from './more_pill';
import SubResourceItem, { SubResource } from './sub_resource_item';

export interface SubResourceListProps {
    subResourceTitle: string;
    subResources: SubResource[];
    visibleSubResourceCount: number;
}

/**
 * The sub resource list component that shows a list of the items belonging to a resource.
 */
export const SubResourceList: React.StatelessComponent<SubResourceListProps> = ({
    subResourceTitle, subResources, visibleSubResourceCount,
}) => {
    const showMorePill = subResources.length > visibleSubResourceCount;
    const showItems = showMorePill ? visibleSubResourceCount : subResources.length;
    return (
        <div className="sub-resource-list">
            <div className="sub-resource-list__title">
                {subResourceTitle}
            </div>
            <div className="sub-resource-list__items">
                {subResources.slice(0, showItems).map((subResource) => (
                    <SubResourceItem
                        key={subResource.subResourceId}
                        subResource={subResource}
                    />
                ))}
                {showMorePill && (
                    <MorePill names={subResources.slice(showItems).map((r) => r.name)} />
                )}
            </div>
        </div>
    );
};

SubResourceList.displayName = 'SubResourceList';

export default SubResourceList;
