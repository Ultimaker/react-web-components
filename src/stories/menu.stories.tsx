import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { State, Store } from '@sambego/storybook-state';
import { withInfo } from '@storybook/addon-info';

import ContextMenu from '../components/context_menu';
import ContextMenuItem from '../components/context_menu_item';

const stories = storiesOf('Menus', module);

const label = 'Menu Offset Direction';
const options = {
    Left: 'left',
    Right: 'right',
};
const defaultValue = 'Left';

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Context menu', withInfo(
    'Text input field'
)(() =>
    <ContextMenu menuWidth={200} menuOffsetDirection={selectV2(label, options, defaultValue)}>
        <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 1', 'Context menu item 1')} />
        <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 2', 'Context menu item 2')} />
        <ContextMenuItem onClickHandler={action('clicked')} disabled={boolean('Disabled', false)} label={text('Text 3', 'Context menu item 3')} />
    </ContextMenu>
));