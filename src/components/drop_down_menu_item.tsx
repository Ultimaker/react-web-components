import * as React from 'react';
import * as classNames from 'classnames';

// components
import Button from './button';

export interface DropDownMenuItemProps {
    active: boolean;
    disabled?: boolean;
    onClickHandler: () => void;
    /** Passed by the DropDownMenu component */
    onCloseMenuHandler?: () => void;
}

const DropDownMenuItem: React.StatelessComponent<DropDownMenuItemProps> = ({
    active, disabled, onClickHandler, onCloseMenuHandler, children,
}) => (
    <li>
        <Button
            className={classNames('context-menu__button', { disabled, active })}
            style="no-style"
            onClickHandler={() => { onCloseMenuHandler(); onClickHandler(); }}
            disabled={disabled}
        >
            {children}
        </Button>
    </li>
);

DropDownMenuItem.displayName = 'DropDownMenuItem';

export default DropDownMenuItem;
