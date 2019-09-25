import * as React from 'react';
import classNames from 'classnames';

// components
import DropDownMenuBase from './drop_down_menu_base';
import Button from './button';
import Divider from './divider';
import AppSwitcherTrigger from './app_switcher_trigger';
import SlideInPanel from '../components/slide_in_panel';
import LinkIcon from './icons/link_icon';

export interface ApplicationListItem {
    /* eslint-disable camelcase */
    application_type?: string,
    name?: string,
    url?: string,
}

export interface AppSwitcherMenuProps {
    /** The list of apps to show */
    appsList: ApplicationListItem[];
    /**
     * Used to toggle the visibility of the menu.
     * Passed in by the header component.
     */
    showMenu?: boolean;
    /**
     * Called when the menu visibility is toggled.
     * Passed in by the header component.
     */
    onToggleMenuHandler?: (showMenu: boolean) => void;
}

export class AppSwitcherMenu extends React.Component<AppSwitcherMenuProps, {}> {
    private _onToggleMenuHandler(showMenu: boolean) {
        const { onToggleMenuHandler } = this.props;
        onToggleMenuHandler(showMenu);
    }

    private _renderLink(link: ApplicationListItem): JSX.Element {
        return (
            <li key={link.url}>
                <Button
                    appearance="no-style"
                    className="drop-down-menu-base__item"
                    type="link"
                    linkURL={link.url}
                    linkToNewTab={link.application_type === 'external'}
                    onClickHandler={() => this._onToggleMenuHandler(false)}
                >
                    {link.name}
                    {link.application_type === 'external'
                        && <LinkIcon />}
                </Button>
            </li>
        );
    }

    private _renderInternalLinks(): JSX.Element[] {
        const { appsList } = this.props;
        const internalLinks = appsList.filter((app) => app.application_type === 'internal');
        return internalLinks.map((link) => this._renderLink(link));
    }

    private _renderExternalLinks(): JSX.Element[] {
        const { appsList } = this.props;
        const internalLinks = appsList.filter((app) => app.application_type === 'external');
        return internalLinks.map((link) => this._renderLink(link));
    }

    render(): JSX.Element {
        const { showMenu } = this.props;
        const { appsList } = this.props;

        return (
            <div className={classNames('app-switcher-menu', { 'app-switcher-menu--open': showMenu })}>
                <div className="app-switcher-menu__desktop show-sm">
                    <DropDownMenuBase
                        showMenu={showMenu}
                        triggerElement={<AppSwitcherTrigger isAppSwitcherOpen={showMenu} />}
                        onToggleMenuHandler={(newShowMenu) => this._onToggleMenuHandler(newShowMenu)}
                    >
                        {appsList && (
                            <div>
                                {this._renderInternalLinks()}

                                <Divider width="1px" margin />

                                {this._renderExternalLinks()}
                            </div>
                        )}
                    </DropDownMenuBase>
                </div>

                <div className="app-switcher-menu__mobile hide-sm">
                    <Button
                        appearance="no-style"
                        onClickHandler={() => this._onToggleMenuHandler(!showMenu)}
                        className="app-switcher-menu__mobile-trigger"
                    >
                        <AppSwitcherTrigger isAppSwitcherOpen={showMenu} />
                    </Button>

                    <SlideInPanel
                        isOpen={showMenu}
                        width="30rem"
                        includeHeader={false}
                        onOverlayClickHandler={() => this._onToggleMenuHandler(false)}
                    >

                        <ul className="drop-down-menu-base__menu-list">
                            {appsList && (
                                <div>
                                    {this._renderInternalLinks()}

                                    <Divider width="1px" margin />

                                    {this._renderExternalLinks()}
                                </div>
                            )}
                        </ul>
                    </SlideInPanel>
                </div>
            </div>
        );
    }
}

export default AppSwitcherMenu;
