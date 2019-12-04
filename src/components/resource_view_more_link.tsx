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
export class ResourceViewMoreLink extends React.Component
<ResourceViewMoreLinkProps> {
    constructor(props) {
        super(props);
    }
    render() {
        const {icon, url } = this.props;
        return (
            <a className={'resource-view-more-link'} href={url}>
                {icon}
            </a>
        );
    }
}

export default ResourceViewMoreLink;
