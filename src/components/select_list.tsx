import * as React from 'react';
import classNames from 'classnames';
import { UnmountClosed } from 'react-collapse';

// components
import Button from './button';
import SelectListItem from './select_list_item';
import PanelArrow from './panel_arrow';

export type MenuDirection = 'left' | 'right';

export interface SelectListProps {
    /** Select list id */
    id?: string;
    /** The list of available options */
    options: SelectOption[];
    /** The value of the selected option */
    value: string | number;
    /** Called when an option is selected */
    onChangeHandler: (value: string | number) => void;
    /** When true the error state will be displayed */
    error?: boolean;
}

export interface SelectOption {
    label: string,
    value: string | number,
    disabled?: boolean
}

export interface SelectListState {
    showMenu: boolean;
}

export class SelectList extends React.Component<SelectListProps, SelectListState> {
    state = {
        showMenu: false,
    }

    constructor(props: SelectListProps) {
        super(props);
        this._menuRef = React.createRef();
        this._onOutsideFocusHandler = this._onOutsideFocusHandler.bind(this);
        this._setShowMenu = this._setShowMenu.bind(this);
        this._onClickHandler = this._onClickHandler.bind(this);
    }

    private _menuRef;

    private _onOutsideFocusHandler(event): void {
        if (this._menuRef && !this._menuRef.current.contains(event.target)) {
            // close menu is user clicks or tabs outside
            this._setShowMenu(false);
        }

        if (event.key === 'Escape') {
            // close menu is user presses escape
            this._setShowMenu(false);
        }
    }

    private _setShowMenu(showMenu: boolean): void {
        if (showMenu) {
            document.addEventListener('mousedown', this._onOutsideFocusHandler);
            document.addEventListener('keydown', this._onOutsideFocusHandler);
        } else {
            document.removeEventListener('mousedown', this._onOutsideFocusHandler);
            document.removeEventListener('keydown', this._onOutsideFocusHandler);
        }

        this.setState({
            showMenu,
        });
    }

    private _getActiveOptionLabel() {
        const { options, value } = this.props;
        const option = options.find(newOption => newOption.value === value);
        return option ? option.label : null;
    }

    /**
     * Handle clicking on a menu item. If the the clicked option is not disabled,
     * call the onChangeHandler from the props,
     * clear the stored focused index,
     * and close the menu.
     * @param value - the value of the selected meu item
     * @param disabled - whether the selected item is disabled
     */
    private _onClickHandler(value, disabled) {
        const { onChangeHandler } = this.props;

        if (!disabled && value) {
            this._setShowMenu(false);
            onChangeHandler(value);
            this._setShowMenu(false);
        }
    }

    render(): JSX.Element {
        const {
            id, error, options, value,
        } = this.props;
        const { showMenu } = this.state;

        const classes = classNames('drop-down-menu', { visible: showMenu });
        const labelClasses = classNames('label', { active: showMenu, error });

        return (
            <div
                ref={this._menuRef}
                className={classes}
                id={id}
            >

                <Button style="no-style" className={labelClasses} onClickHandler={() => this._setShowMenu(!showMenu)}>
                    <div className="layout layout--align-middle layout--gutter-none">
                        <div className="layout__item u-fill">
                            <div className="label__text">{this._getActiveOptionLabel()}</div>
                        </div>
                        <div className="layout__item u-fit layout__item--right">
                            <PanelArrow active={showMenu} width="1.2rem" color="blue" />
                        </div>
                    </div>
                </Button>

                <div className="container">
                    <div className="menu">
                        <UnmountClosed
                            isOpened={showMenu}
                            springConfig={{ stiffness: 370, damping: 35 }}
                        >
                            <ul>
                                {options.map((option, index) => (
                                    <SelectListItem
                                        key={index}
                                        onChangeHandler={this._onClickHandler}
                                        label={option.label}
                                        value={option.value}
                                        active={value === option.value}
                                        disabled={option.disabled}
                                    />
                                ))}
                            </ul>
                        </UnmountClosed>
                    </div>
                </div>

            </div>
        );
    }
}

export default SelectList;
