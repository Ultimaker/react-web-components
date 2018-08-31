import * as React from 'react';
import * as classNames from 'classnames';
import { UnmountClosed } from 'react-collapse';

import PanelArrow from './panel_arrow';

export type MenuDirection = 'left' | 'right';

export interface DropDownMenuProps {
    activeLabel: string | number;
}

export interface DropDownMenuState {
    showMenu: boolean;
}

export default class DropDownMenu extends React.Component<DropDownMenuProps, DropDownMenuState> {

    state = {
        showMenu: false
    };

    _setShowMenu(showMenu: boolean): void {
        this.setState({
            showMenu: showMenu
        });
    }

    _stopPropagation(e): void {
        e.stopPropagation()
    }

    render(): JSX.Element {

        const { activeLabel } = this.props;
        const { showMenu } = this.state;

        const dropDownMenuClasses = classNames('drop-down-menu', { 'visible': showMenu });

        return <div className={dropDownMenuClasses} tabIndex={1}
            onClick={this._stopPropagation} onBlur={() => this._setShowMenu(false)}>

            <div className="label" onClick={() => this._setShowMenu(!showMenu)} >
                <div className="layout layout--align-middle layout--gutter-none">
                    <div className="layout__item u-fit">
                        <div className="text">{activeLabel}</div>
                    </div>
                    <div className="layout__item u-fit layout__item--right">
                        <PanelArrow active={showMenu} width="1.2rem" color="blue" />
                    </div>
                </div>
            </div>

            <div className="container" onClick={() => this._setShowMenu(false)}>
                <div className="menu">
                    <UnmountClosed isOpened={showMenu} springConfig={{ stiffness: 370, damping: 35 }}>
                        <ul>
                            {this.props.children}
                        </ul>
                    </UnmountClosed>
                </div>
            </div>

        </div>
    }
}
