import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

// components
import Button from './button';
import ProfileImage from './profile_image';
import LinkIcon from './icons/link_icon';

// utils
import { I18n } from '../utils/i18n';


export interface UserAccountMenuProps {
    /** Called when the sign out button is clicked */
    onSignOutClickHandler: () => void;
    /** URL to the account management page */
    manageAccountURL: string;
    /** The display name of the user. */
    displayName: string
    /** An URL for the user profile image. */
    imageURL?: string
    /** The width of the clickable area around the profile picture */
    triggerWidth?: string;
    /** The height of the clickable area around the profile picture */
    triggerHeight?: string;

    signedOut?: boolean;
    onSignInClickHandler?: () => void;
}

export interface UserAccountMenuState {
    showMenu: boolean;
}

export class UserAccountMenu extends React.Component<UserAccountMenuProps, UserAccountMenuState> {

    private _menuRef;

    state = {
        showMenu: false
    };

    constructor(props: UserAccountMenuProps) {
        super(props);
        this._menuRef = React.createRef();
        this._onOutsideClickHandler = this._onOutsideClickHandler.bind(this);
    }

    private _setShowMenu(showMenu: boolean): void {
        if (showMenu) {
            document.addEventListener('mousedown', this._onOutsideClickHandler);
        }
        else {
            document.removeEventListener('mousedown', this._onOutsideClickHandler);
        }

        this.setState({
            showMenu: showMenu
        });
    }

    private _onOutsideClickHandler(e: any): void {
        if (this._menuRef.current && !this._menuRef.current.contains(e.target)) {
            this._setShowMenu(false);
        }
    }

    private _stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
    }

    render(): JSX.Element {

        const { onSignOutClickHandler, manageAccountURL, displayName, imageURL,
            triggerWidth, triggerHeight, signedOut, onSignInClickHandler, children } = this.props;
        const { showMenu } = this.state;

        const classes = classNames('user-account-menu', { 'visible': showMenu });
        const triggerClasses = classNames('trigger', { 'trigger--rectangle': triggerWidth || triggerHeight });

        return <div className={classes} tabIndex={1} onClick={this._stopPropagation} ref={this._menuRef}>

            <div className={triggerClasses}
                onClick={() => this._setShowMenu(!showMenu)}
                style={triggerWidth || triggerHeight ? { width: triggerWidth, height: triggerHeight } : undefined}
            >
                <ProfileImage imageURL={imageURL} size="3.6rem" />
            </div>

            <div className='container'>
                <div className="menu">
                    <Collapse isOpened={showMenu} springConfig={{ stiffness: 390, damping: 32 }}>
                        <div className="sections">

                            {children &&
                                <div className="other-section">
                                    {React.Children.map(children, (child: JSX.Element) =>
                                        React.cloneElement(child, { onCloseMenuHandler: () => this._setShowMenu(false) })
                                    )}
                                </div>
                            }

                            <div className="account-section">
                                {!signedOut &&
                                    <React.Fragment>
                                        <div className="account-section__title">
                                            {I18n.translate("User account menu title", "My account")}
                                        </div>

                                        <div className="account-section__profile">
                                            <div className="account-section__icon">
                                                <ProfileImage imageURL={imageURL} size="10rem" />
                                            </div>
                                            <div className="account-section__name">{displayName}</div>
                                        </div>

                                        <div className="account-section__buttons">
                                            <Button style="secondary" type="link" linkURL={manageAccountURL} linkToNewTab>
                                                {I18n.translate("User account menu button", "Manage account")}
                                                <LinkIcon />
                                            </Button>

                                            <Button style="secondary" onClickHandler={() => { this._setShowMenu(false); onSignOutClickHandler() }}>
                                                {I18n.translate("User account menu button", "Sign out")}
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                }
                                {signedOut &&
                                    <Button style="secondary" onClickHandler={() => { this._setShowMenu(false); onSignInClickHandler() }}>
                                        {I18n.translate("User account menu button", "Sign in")}
                                    </Button>
                                }
                            </div>

                        </div>
                    </Collapse>
                </div>
            </div>

        </div>
    }
}

export default UserAccountMenu;
