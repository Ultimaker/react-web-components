import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { State, Store } from '@sambego/storybook-state';
import { withInfo } from '@storybook/addon-info';

import ContextMenu from '../components/context_menu';
import ContextMenuItem from '../components/context_menu_item';
import DropDownMenu from '../components/drop_down_menu';
import DropDownMenuItem from '../components/drop_down_menu_item';

const stories = storiesOf('Menus', module);

const store = new Store({
  label: 'Item 1',
});

const options = {
  Left: 'left',
  Right: 'right',
};
const defaultValue = 'left';

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }));

stories.add('Context menu', withInfo(
  'Context menu for addition actions'
)(() =>
  <ContextMenu menuWidth={200} menuOffsetDirection={selectV2('Menu Offset Direction', options, defaultValue)}>
    <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 1', 'Context menu item 1')} />
    <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 2', 'Context menu item 2')} />
    <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 3', 'Context menu item 3')} />
  </ContextMenu>
));

stories.add('Drop down menu', withInfo({
  propTablesExclude: [State],
  text: 'Drop down for changing options'
})(() =>
  <State store={store}>
    <DropDownMenu label={store.get('label')}>
      <DropDownMenuItem onClickHandler={() => store.set({ label: 'Item 1' })}
        label={text('Text 1', 'Item 1')}
        active={store.get('label') === 'Item 1'}
        disabled={boolean('Disabled', false)} />
      <DropDownMenuItem onClickHandler={() => store.set({ label: 'Item 2' })}
        label={text('Text 2', 'Item 2')}
        active={store.get('label') === 'Item 2'}
        disabled={boolean('Disabled', false)} />
      <DropDownMenuItem onClickHandler={() => store.set({ label: 'Item 3' })}
        label={text('Text 3', 'Item 3')}
        active={store.get('label') === 'Item 3'}
        disabled={boolean('Disabled', false)} />
    </DropDownMenu>
  </State>
));