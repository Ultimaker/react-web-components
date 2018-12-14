import * as React from 'react';
import * as classNames from 'classnames';
import { UnmountClosed } from 'react-collapse';

// components
import Button from './button';
import PanelArrow from './panel_arrow';

export type MenuDirection = 'left' | 'right';

export interface DropDownMenuProps {
    activeLabel: string | number;
}

export interface DropDownMenuState {
    showMenu: boolean;
}

export default class DropDownMenu extends React.Component<DropDownMenuProps, DropDownMenuState> {
    static _stopPropagation(e): void {
        e.stopPropagation();
    }

    state = {
        showMenu: false,
    };

    constructor(props: DropDownMenuProps) {
        super(props);
        this._menuRef = React.createRef();
        this._onOutsideFocusHandler = this._onOutsideFocusHandler.bind(this);
        this._setShowMenu = this._setShowMenu.bind(this);
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


    render(): JSX.Element {
        const { activeLabel, children } = this.props;
        const { showMenu } = this.state;

        const classes = classNames('drop-down-menu', { visible: showMenu });

        return (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div ref={this._menuRef} className={classes} onClick={DropDownMenu._stopPropagation}>

                <Button style="no-style" className="label" onClickHandler={() => this._setShowMenu(!showMenu)}>
                    <div className="layout layout--align-middle layout--gutter-none">
                        <div className="layout__item u-fit">
                            <div className="label__text">{activeLabel}</div>
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
                                {React.Children.map(children, (child: JSX.Element) => (
                                    React.cloneElement(child, {
                                        onCloseMenuHandler: () => this._setShowMenu(false),
                                    })
                                ))}
                            </ul>
                        </UnmountClosed>
                    </div>
                </div>

            </div>
        );
    }
}
