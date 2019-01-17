import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
    withKnobs, text, boolean, selectV2,
} from '@storybook/addon-knobs/react';
import styles from '@sambego/storybook-styles';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

import ContextMenu from '../components/context_menu';
import ContextMenuItem from '../components/context_menu_item';
import DropDownMenu from '../components/drop_down_menu';
import DropDownMenuItem from '../components/drop_down_menu_item';
import UserAccountMenu from '../components/user_account_menu';

const stories = storiesOf('Menus', module);

const offsetOptions = {
    Left: 'left',
    Right: 'right',
};
const offsetDefaultValue = 'left';

const directionOptions = {
    North: 'north',
    South: 'south',
};
const directionDefaultValue = 'south';

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Context menu', withState({ showMenu: false })(withInfo(
    'Context menu for additional actions',
)(({ store }) => (
    <ContextMenu
        showMenu={store.state.showMenu}
        onToggleMenuHandler={showMenu => store.set({ showMenu })}
        menuWidth={200}
        menuDirection={selectV2('Menu Direction', directionOptions, directionDefaultValue)}
        menuOffsetDirection={selectV2('Menu Offset Direction', offsetOptions, offsetDefaultValue)}
    >
        <ContextMenuItem
            onClickHandler={() => { store.set({ showMenu: false }); action('clicked 1'); }}
            disabled={boolean('Disabled', false)}
        >
            {text('Text 1', 'Context menu item 1')}
        </ContextMenuItem>
        <ContextMenuItem
            onClickHandler={() => { store.set({ showMenu: false }); action('clicked 2'); }}
            disabled={boolean('Disabled', false)}
        >
            {text('Text 2', 'Context menu item 2')}
        </ContextMenuItem>
        <ContextMenuItem
            onClickHandler={() => { store.set({ showMenu: false }); action('clicked 3'); }}
            disabled={boolean('Disabled', false)}
        >
            {text('Text 3', 'Context menu item 3')}
        </ContextMenuItem>
    </ContextMenu>
))));

stories.add('Drop down menu', withInfo(
    'Drop down menu',
)(() => (
    <DropDownMenu activeLabel="10">
        <DropDownMenuItem active onClickHandler={action('clicked')}>
            10
        </DropDownMenuItem>
        <DropDownMenuItem active={false} onClickHandler={action('clicked')}>
            20
        </DropDownMenuItem>
        <DropDownMenuItem active={false} onClickHandler={action('clicked')}>
            40
        </DropDownMenuItem>
        <DropDownMenuItem active={false} onClickHandler={action('clicked')}>
            80
        </DropDownMenuItem>
    </DropDownMenu>
)));

stories.add('User account menu', withInfo(
    'User account menu',
)(() => (
    <UserAccountMenu
        onSignOutClickHandler={action('clicked')}
        manageAccountURL={text('Account Management URL', 'https://account.ultimaker.com')}
        displayName="Test User"
        triggerWidth={text('Trigger width', null)}
        triggerHeight={text('Trigger height', null)}
        signedOut={boolean('Sign out', false)}
        onSignInClickHandler={action('clicked')}
    />
)));
