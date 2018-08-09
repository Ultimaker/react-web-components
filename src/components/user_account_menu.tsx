import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

// components
import Image from './image';
import Button from './button';
import EmailIcon from './icons/email_icon';

// utils
import { I18n } from '../utils/i18n';

export interface AccountDetails {
  /** The ID of the author. */
  author_id?: string
  /** The description of the author. */
  description?: string
  /** The display name of the item. */
  display_name: string
  /** The e-mail of the author. */
  email?: string
  /** An URL for the icon of the author. */
  icon_url?: string
  /** The URL to the author's website. */
  website?: string
}

export interface UserAccountMenuProps {
  onSignOutClickHandler: () => void;
  onManageAccountClickHandler: () => void;
  account: AccountDetails;
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

    const { onSignOutClickHandler, onManageAccountClickHandler, account, children } = this.props;
    const { showMenu } = this.state;

    const classes = classNames('user-account-menu', { 'visible': showMenu });

    return <div className={classes} tabIndex={1} onClick={this._stopPropagation}>

      <div className="trigger" onClick={() => this._setShowMenu(!showMenu)}>
        <Image src={account.icon_url} size="3.6rem" />
      </div>

      <div className='container'>
        <div className="menu" ref={this.menuRef}>
          <Collapse isOpened={showMenu} springConfig={{ stiffness: 390, damping: 32 }}>

            <div className="account-section">
              <div className="account-section__title">{I18n.translate("User account menu title", "My account")}</div>

              <div className="account-section__profile">
                <div className="account-section__icon">
                  <Image src={account.icon_url} size="7.5rem" />
                </div>
                <div className="account-section__name">{account.display_name}</div>
              </div>

              <Button style="secondary" onClickHandler={() => { this._setShowMenu(false); onManageAccountClickHandler() }}>
                {I18n.translate("User account menu button", "Manage account")}
              </Button>

              <Button style="secondary" onClickHandler={() => { this._setShowMenu(false); onSignOutClickHandler() }}>
                {I18n.translate("User account menu button", "Sign out")}
              </Button>
            </div>

            {children &&
              <div className="other-section">
                {children}
              </div>
            }

          </Collapse>
        </div>
      </div>

    </div>
  }
}

export default UserAccountMenu;