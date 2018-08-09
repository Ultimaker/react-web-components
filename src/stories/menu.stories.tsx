import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import ContextMenu from '../components/context_menu';
import ContextMenuItem from '../components/context_menu_item';
import UserAccountMenu from '../components/user_account_menu';

const stories = storiesOf('Menus', module);

const offsetOptions = {
  Left: 'left',
  Right: 'right',
};
const offsetDefaultValue = 'left';

const directionOptions = {
  Left: 'north',
  Right: 'south',
};
const directionDefaultValue = 'south';

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));

stories.add('Context menu', withInfo(
  'Context menu for additional actions'
)(() =>
  <ContextMenu
    menuWidth={200}
    menuDirection={selectV2('Menu Direction', directionOptions, directionDefaultValue)}
    menuOffsetDirection={selectV2('Menu Offset Direction', offsetOptions, offsetDefaultValue)}>
    <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 1', 'Context menu item 1')} />
    <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 2', 'Context menu item 2')} />
    <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 3', 'Context menu item 3')} />
  </ContextMenu>
));

stories.add('User account menu', withInfo(
  'User account menu'
)(() =>
  <UserAccountMenu
    onSignOutClickHandler={action('clicked')}
    onManageAccountClickHandler={action('clicked')}
    account={{ display_name: 'Test User' }}
  ></UserAccountMenu>
));