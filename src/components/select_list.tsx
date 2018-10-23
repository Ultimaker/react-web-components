import * as React from 'react';
import classNames from 'classnames';
import { UnmountClosed } from 'react-collapse';

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
    focusedIndex: number;
}

export class SelectList extends React.Component<SelectListProps, SelectListState> {

    state = {
        showMenu: false,
        focusedIndex: null
    }

    constructor(props) {
        super(props);

        this._onKeyPressed = this._onKeyPressed.bind(this);
        this._onClickHandler = this._onClickHandler.bind(this);
    }

    private _setShowMenu(showMenu: boolean): void {
        this.setState({
            showMenu: showMenu
        });
    }

    private _getActiveOptionLabel() {
        const { options, value } = this.props;
        const option = options.find(option => option.value === value);
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
            onChangeHandler(value);
            this.setState({ focusedIndex: null });
            this._setShowMenu(false);
        }
    }

    /**
     * Updates the focusedIndex and validates it
     * @param changeByValue - value to adjust the focusedIndex by
     */
    private _updateFocusedIndex(changeByValue: number): void {
        const { options } = this.props;
        const { focusedIndex } = this.state;

        // if the focusedIndex has not been set, set it to 0, otherwise adjust it by the value of the changeByValue
        let newIndex = focusedIndex !== null ? focusedIndex + changeByValue : 0;

        // if the user presses down on the last item, go to the first
        if (newIndex > options.length - 1) {
            newIndex = 0;
        }

        // if the user presses up on the first item, go the last
        if (newIndex < 0) {
            newIndex = options.length - 1;
        }

        this.setState({ focusedIndex: newIndex });
    }

    private _onKeyPressed(e) {
        const { options } = this.props;
        const { focusedIndex } = this.state;

        switch (e.key) {
            case 'ArrowDown':
                this._setShowMenu(true);
                this._updateFocusedIndex(1);
                break;
            case 'ArrowUp':
                this._setShowMenu(true);
                this._updateFocusedIndex(-1);
                break;
            case 'Enter':
                const focusedItem = options[focusedIndex];
                if(focusedItem) {
                    this._onClickHandler(focusedItem.value, focusedItem.disabled)
                }
                break;
        }
    }

    render(): JSX.Element {
        const { id, error, options, value } = this.props;
        const { showMenu, focusedIndex } = this.state;

        const dropDownMenuClasses = classNames('drop-down-menu', { 'visible': showMenu });
        const labelClasses = classNames('label', { 'active': showMenu, error });

        return <div id={id} className={dropDownMenuClasses}
            tabIndex={1}
            onFocus={() => this._setShowMenu(true)}
            onBlur={() => this._setShowMenu(false)}
            onKeyDown={this._onKeyPressed}
        >

            <div className={labelClasses} onClick={() => this._setShowMenu(true)} >
                <div className="layout layout--align-middle layout--gutter-none">
                    <div className="layout__item u-fit">
                        <div className="text">{this._getActiveOptionLabel()}</div>
                    </div>
                    <div className="layout__item u-fit layout__item--right">
                        <PanelArrow active={showMenu} width="1.2rem" color="blue" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div ref="menu" className="menu">
                    <UnmountClosed isOpened={showMenu} springConfig={{ stiffness: 370, damping: 35 }}>
                        <ul>
                            {options.map((option, index) => {
                                return <SelectListItem key={index}
                                    onChangeHandler={this._onClickHandler}
                                    label={option.label}
                                    value={option.value}
                                    active={value === option.value}
                                    disabled={option.disabled}
                                    focused={focusedIndex === index && !option.disabled} />
                            })}
                        </ul>
                    </UnmountClosed>
                </div>
            </div>

        </div>
    }
}

export default SelectList;
