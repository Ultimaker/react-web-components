import * as React from 'react';
import classNames from 'classnames';

// components
import DropDownMenuBase from './drop_down_menu_base';
import PanelArrow from './panel_arrow';

export interface DropDownMenuProps {
    /** Optional ID for the menu item */
    id?: string;
    activeLabel: string | number;
    error?: boolean;
    children: JSX.Element | JSX.Element[];
}

export interface DropDownMenuState {
    showMenu: boolean;
}

export default class DropDownMenu extends React.Component<DropDownMenuProps, DropDownMenuState> {
    static _stopPropagation(e): void {
        e.stopPropagation();
    }

    state = {
        showMenu: false,
    };

    private _onToggleMenuHandler(showMenu: boolean) {
        this.setState({ showMenu });
    }

    private _renderTrigger(): JSX.Element {
        const { activeLabel } = this.props;
        const { showMenu } = this.state;

        return (
            <div className="layout layout--align-middle layout--gutter-none">
                <div className="layout__item u-fit">
                    <div className="drop-down-menu-base__button-label">{activeLabel}</div>
                </div>
                <div className="layout__item u-fit layout__item--right">
                    <PanelArrow active={showMenu} width="1.2rem" color="blue" />
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        const { id, error, children } = this.props;
        const { showMenu } = this.state;

        const classes = classNames(
            'drop-down-menu',
            { 'drop-down-menu--error': error },
        );

        return (
            <div className={classes} id={id}>
                <DropDownMenuBase
                    showMenu={showMenu}
                    triggerElement={this._renderTrigger()}
                    onToggleMenuHandler={newShowMenu => this._onToggleMenuHandler(newShowMenu)}
                >
                    {children}
                </DropDownMenuBase>
            </div>
        );
    }
}
