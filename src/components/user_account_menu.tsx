import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

// components
import Button from './button';
import ProfileImage from './profile_image';
import LinkIcon from './icons/link_icon';
import DropDownMenuBase from './drop_down_menu_base';

// utils
import { I18n } from '../utils/i18n';


export interface UserAccountMenuProps {
    /** Whether the user is signed out */
    signedOut?: boolean;
    /** Called when the sign in button is clicked */
    onSignInClickHandler?: () => void;
    /** Called when the sign out button is clicked */
    onSignOutClickHandler: () => void;
    /** URL to the account management page */
    manageAccountURL?: string;
    /** The display name of the user. */
    displayName: string
    /** An URL for the user profile image. */
    imageURL?: string
    /** The width of the clickable area around the profile picture */
    triggerWidth?: string;
    /** The height of the clickable area around the profile picture */
    triggerHeight?: string;
}

export interface UserAccountMenuState {
    showMenu: boolean;
}

export class UserAccountMenu extends React.Component<UserAccountMenuProps, UserAccountMenuState> {
    state = {
        showMenu: false,
    };

    constructor(props: UserAccountMenuProps) {
        super(props);
        this._onSignIn = this._onSignIn.bind(this);
        this._onSignOut = this._onSignOut.bind(this);
    }

    private _onToggleMenuHandler(showMenu: boolean) {
        this.setState({ showMenu });
    }

    private _onSignOut() {
        const { onSignOutClickHandler } = this.props;
        this._onToggleMenuHandler(false);
        onSignOutClickHandler();
    }

    private _onSignIn() {
        const { onSignInClickHandler } = this.props;
        this._onToggleMenuHandler(false);
        onSignInClickHandler();
    }

    private _renderTrigger() {
        const { imageURL, triggerWidth, triggerHeight } = this.props;

        return (
            <div
                className="user-account-menu__trigger-image"
                style={
                    (triggerWidth || triggerHeight)
                    && { width: triggerWidth, height: triggerHeight }
                }
            >
                <ProfileImage imageURL={imageURL} size="3.6rem" />
            </div>
        );
    }

    render(): JSX.Element {
        const {
            manageAccountURL, displayName, imageURL,
            signedOut, triggerWidth, triggerHeight, children,
        } = this.props;
        const { showMenu } = this.state;

        const classes = classNames(
            'user-account-menu',
            { 'user-account-menu--trigger-rectangle': triggerWidth || triggerHeight },
        );

        const childProps = children
            && { onCloseMenuHandler: () => this._onToggleMenuHandler(false) };

        return (
            <div className={classes}>
                <DropDownMenuBase
                    showMenu={showMenu}
                    triggerElement={this._renderTrigger()}
                    onToggleMenuHandler={newShowMenu => this._onToggleMenuHandler(newShowMenu)}
                >
                    <div className="sections">

                        {children && (
                            <div className="other-section">
                                {React.Children.map(children, (child: JSX.Element) => (
                                    React.cloneElement(child, childProps)
                                ))}
                            </div>
                        )}

                        <div className="account-section">
                            {!signedOut && (
                                <React.Fragment>
                                    <div className="account-section__title">
                                        {I18n.translate('User account menu title', 'My account')}
                                    </div>

                                    <div className="account-section__profile">
                                        <div className="account-section__icon">
                                            <ProfileImage imageURL={imageURL} size="10rem" />
                                        </div>
                                        <div className="account-section__name">{displayName}</div>
                                    </div>

                                    <div className="account-section__buttons">
                                        {manageAccountURL && (
                                            <Button
                                                style="secondary"
                                                type="link"
                                                id="account-menu-manage-button"
                                                linkURL={manageAccountURL}
                                                linkToNewTab
                                            >
                                                {I18n.translate('User account menu button', 'Manage account')}
                                                <LinkIcon />
                                            </Button>
                                        )}

                                        <Button
                                            style="secondary"
                                            onClickHandler={this._onSignOut}
                                            id="account-menu-sign-out-button"
                                        >
                                            {I18n.translate('User account menu button', 'Sign out')}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                            {signedOut && (
                                <Button
                                    style="secondary"
                                    id="account-menu-sign-in-button"
                                    onClickHandler={this._onSignIn}
                                >
                                    {I18n.translate('User account menu button', 'Sign in')}
                                </Button>
                            )}
                        </div>

                    </div>
                </DropDownMenuBase>
            </div>
        );
    }
}

export default UserAccountMenu;
