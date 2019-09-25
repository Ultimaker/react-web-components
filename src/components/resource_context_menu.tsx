// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import ContextMenu from './context_menu';
import ContextMenuItem from './context_menu_item';

// types
import { Resource } from './resource_tile';


export interface ResourceContextMenuProps {
    resource: Resource;
}

export interface ResourceContextMenuState {
    showMenu: boolean;
}

/**
 * The resource context menu component displays a menu
 * that allows the user to execute extra actions for a resource.
 */
export class ResourceContextMenu extends React.Component
<ResourceContextMenuProps, ResourceContextMenuState> {
    state = {
        showMenu: false,
    }

    render() {
        const { resource } = this.props;
        const { showMenu } = this.state;
        return (
            <ContextMenu
                menuWidth={240}
                showMenu={showMenu}
                onToggleMenuHandler={() => this.setState({ showMenu: !showMenu })}
            >
                {resource.menuItems.map((menuItem) => (
                    <ContextMenuItem
                        key={menuItem.label}
                        onClickHandler={() => menuItem.handler(resource)}
                        disabled={menuItem.disabled}
                        id={menuItem.id}
                    >
                        <div title={menuItem.title}>
                            {menuItem.label}
                        </div>
                    </ContextMenuItem>
                ))}
            </ContextMenu>
        );
    }
}

export default ResourceContextMenu;
