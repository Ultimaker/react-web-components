// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// generated
import Pill from './pill';
import ProfileImage from './profile_image';
import { Tooltip } from './tooltip';

export interface SubResource {
    subResourceId: string;
    name: string;
    iconUrl?: string;
    showIcon?: boolean;
    showName?: boolean;
}

export interface SubResourceItemProps {
    subResource: SubResource
}

/**
 * The sub-resource component shows a list of names/images.
 */
export const SubResourceItem: React.FC<SubResourceItemProps> = ({
    subResource,
}) => (
    <Tooltip tooltipText={subResource.name}>
        <div className="sub-resource-item">
            {subResource.showIcon && <ProfileImage size="3rem" imageURL={subResource.iconUrl} />}
            {subResource.showName && <Pill>{subResource.name}</Pill>}
        </div>
    </Tooltip>
);

SubResourceItem.displayName = 'SubResourceItem';

export default SubResourceItem;
