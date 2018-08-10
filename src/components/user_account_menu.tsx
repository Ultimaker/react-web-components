import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

// components
import Button from './button';
import ProfileImage from './profile_image';

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
}

export interface UserAccountMenuState {
  showMenu: boolean;
}

export class UserAccountMenu extends React.Component<UserAccountMenuProps, UserAccountMenuState> {

  private menuRef;

  state = {
    showMenu: false
  };

  constructor(props: UserAccountMenuProps) {
    super(props);
    this.menuRef = React.createRef();
    this._onOutsideClickHandler = this._onOutsideClickHandler.bind(this);
  }

  _setShowMenu(showMenu: boolean): void {
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

  _onOutsideClickHandler() {
    if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
      this._setShowMenu(!this.state.showMenu);
    }
  }

  _stopPropagation(e: React.MouseEvent<HTMLDivElement>): void {
    e.stopPropagation();
  }

  render(): JSX.Element {

    const { onSignOutClickHandler, manageAccountURL, displayName, imageURL, children } = this.props;
    const { showMenu } = this.state;

    const classes = classNames('user-account-menu', { 'visible': showMenu });

    return <div className={classes} tabIndex={1} onClick={this._stopPropagation} ref={this.menuRef}>

      <div className="trigger" onClick={() => this._setShowMenu(!showMenu)}>
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
                <div className="account-section__title">
                  {I18n.translate("User account menu title", "My account")}
                </div>

                <div className="account-section__profile">
                  <div className="account-section__icon">
                    <ProfileImage imageURL={imageURL} size="7.5rem" />
                  </div>
                  <div className="account-section__name">{displayName}</div>
                </div>

                <Button style="secondary" type="link" linkURL={manageAccountURL} linkToNewTab>
                  {I18n.translate("User account menu button", "Manage account")}
                </Button>

                <Button style="secondary" onClickHandler={() => { this._setShowMenu(false); onSignOutClickHandler() }}>
                  {I18n.translate("User account menu button", "Sign out")}
                </Button>
              </div>

            </div>
          </Collapse>
        </div>
      </div>

    </div>
  }
}

export default UserAccountMenu;