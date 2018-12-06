import * as React from 'react';
import * as classNames from 'classnames';

export interface DropDownMenuItemProps {
    active: boolean;
    disabled?: boolean;
    onClickHandler: () => void;
}

const DropDownMenuItem: React.StatelessComponent<DropDownMenuItemProps> = ({
    active, disabled, onClickHandler, children,
}) => {
    const handleClick = (e) => {
        if (disabled) {
            e.stopPropagation();
        } else {
            onClickHandler();
        }
    };

    return (
        <li className={classNames({ disabled, active })} onClick={handleClick}>
            {children}
        </li>
    );
};

DropDownMenuItem.displayName = 'DropDownMenuItem';

export default DropDownMenuItem;
