// Copyright (c) 2019 Ultimaker B.V.
import * as React from 'react';

// types
import { Resource } from './resource_tile';


export interface ResourceViewMoreButtonProps {
    resource: Resource;
}

/**
 * The resource context menu component displays a menu
 * that allows the user to execute extra actions for a resource.
 */
export class ResourceViewMoreButton extends React.Component
<ResourceViewMoreButtonProps> {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    private _handleClick() {
        const {resource} = this.props;
        window.open(resource.viewMoreUrl);
    }

    render() {
        const {resource } = this.props;
        return (
            <button className={'resource-view-more-button'} onClick={this._handleClick}>
                {resource.viewMoreIcon}
            </button>
        );
    }
}

export default ResourceViewMoreButton;
