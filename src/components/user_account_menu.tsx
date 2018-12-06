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
    private static _stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
    }

    state = {
        showMenu: false,
    };

    constructor(props: UserAccountMenuProps) {
        super(props);
        this._menuRef = React.createRef();
        this._onOutsideClickHandler = this._onOutsideClickHandler.bind(this);
        this._onSignIn = this._onSignIn.bind(this);
        this._onSignOut = this._onSignOut.bind(this);
    }

    private _menuRef;

    private _setShowMenu(showMenu: boolean): void {
        if (showMenu) {
            document.addEventListener('mousedown', this._onOutsideClickHandler);
        } else {
            document.removeEventListener('mousedown', this._onOutsideClickHandler);
        }

        this.setState({
            showMenu,
        });
    }

    private _onOutsideClickHandler(e: any): void {
        if (this._menuRef.current && !this._menuRef.current.contains(e.target)) {
            this._setShowMenu(false);
        }
    }

    private _onSignOut() {
        const { onSignOutClickHandler } = this.props;
        this._setShowMenu(false);
        onSignOutClickHandler();
    }

    private _onSignIn() {
        const { onSignInClickHandler } = this.props;
        this._setShowMenu(false);
        onSignInClickHandler();
    }

    render(): JSX.Element {
        const {
            manageAccountURL, displayName, imageURL, triggerWidth,
            triggerHeight, signedOut, children,
        } = this.props;
        const { showMenu } = this.state;

        const classes = classNames('user-account-menu', { visible: showMenu });
        const triggerClasses = classNames('trigger', { 'trigger--rectangle': triggerWidth || triggerHeight });

        const childProps = children && { onCloseMenuHandler: () => this._setShowMenu(false) };

        return (
            <div
                className={classes}
                tabIndex={1}
                onClick={UserAccountMenu._stopPropagation}
                ref={this._menuRef}

            >
                <div
                    className={triggerClasses}
                    onClick={() => this._setShowMenu(!showMenu)}
                    style={triggerWidth || triggerHeight ? { width: triggerWidth, height: triggerHeight } : undefined}
                >
                    <ProfileImage imageURL={imageURL} size="3.6rem" />
                </div>

                <div className="container">
                    <div className="menu">
                        <Collapse
                            isOpened={showMenu}
                            springConfig={{ stiffness: 390, damping: 32 }}
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
