/* eslint-disable camelcase */
import * as React from 'react';
import classNames from 'classnames';

// components
import DropDownMenuBase from './drop_down_menu_base';
import Button from './button';
import Divider from './divider';
import AppSwitcherTrigger from './app_switcher_trigger';

export interface AppsList {
    application_type: string,
    name: string,
    url: string,
}

export interface AppSwitcherMenuProps {
    appsList: AppsList[];
}

export interface AppSwitcherMenuState {
    showMenu: boolean;
}

export class AppSwitcherMenu extends React.Component<AppSwitcherMenuProps, AppSwitcherMenuState> {
    private static _renderLink(link: AppsList): JSX.Element {
        return (
            <li>
                <Button
                    appearance="no-style"
                    className="drop-down-menu-base__item"
                    type="link"
                    linkURL={link.url}
                >
                    <span className="text">{link.name}</span>
                </Button>
            </li>
        );
    }

    state = {
        showMenu: false,
    };

    private _onToggleMenuHandler(showMenu: boolean) {
        this.setState({ showMenu });
    }

    private _renderInternalLinks(): JSX.Element[] {
        const { appsList } = this.props;
        const internalLinks = appsList.filter(app => app.application_type === 'internal');
        return internalLinks.map(link => AppSwitcherMenu._renderLink(link));
    }

    private _renderExternalLinks(): JSX.Element[] {
        const { appsList } = this.props;
        const internalLinks = appsList.filter(app => app.application_type === 'external');
        return internalLinks.map(link => AppSwitcherMenu._renderLink(link));
    }

    render(): JSX.Element {
        const { showMenu } = this.state;

        return (
            <div className={classNames('app-switcher-menu', { 'app-switcher-menu--open': showMenu })}>
                <DropDownMenuBase
                    showMenu={showMenu}
                    triggerElement={<AppSwitcherTrigger isAppSwitcherOpen={showMenu} />}
                    onToggleMenuHandler={newShowMenu => this._onToggleMenuHandler(newShowMenu)}
                >
                    <div>
                        {this._renderInternalLinks()}

                        <Divider width="1px" margin />

                        {this._renderExternalLinks()}
                    </div>
                </DropDownMenuBase>
            </div>
        );
    }
}

export default AppSwitcherMenu;
