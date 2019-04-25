// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// components
import Button from './button';
import UltimakerLogo from './icons/ultimaker_logo';

export interface HeaderProps {
    /** The application logo */
    headerLogo?: JSX.Element;
    /** The URL to go to when the logo is clicked */
    headerLogoUrl?: string;
    /** The application name */
    appName?: string;
    /** The user account menu component */
    userAccountMenu?: JSX.Element;
    /** The application switcher component */
    applicationSwitcher?: JSX.Element;
    /** The in app navigation component */
    navigation?: JSX.Element;
}

export interface HeaderState {
    showMobileMenu: boolean;
    showAppSwitcherMenu: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    static defaultProps = {
        headerLogo: <UltimakerLogo />,
        headerLogoUrl: '/',
    };

    private static _toggleAppNoScroll(setNoScroll: boolean): void {
        if (setNoScroll) {
            document.body.classList.add('noscroll');
        } else {
            document.body.classList.remove('noscroll');
        }
    }

    constructor(props) {
        super(props);

        this._toggleAppSwitcherMenuHandler = this._toggleAppSwitcherMenuHandler.bind(this);
    }

    state = {
        showMobileMenu: false,
        showAppSwitcherMenu: false,
    }

    private _toggleShowMobileMenu(showMobileMenu: boolean): void {
        Header._toggleAppNoScroll(showMobileMenu);

        this.setState({
            showMobileMenu,
            showAppSwitcherMenu: false,
        });
    }

    private _toggleAppSwitcherMenuHandler(showAppSwitcherMenu: boolean): void {
        Header._toggleAppNoScroll(showAppSwitcherMenu);

        this.setState({
            showAppSwitcherMenu,
            showMobileMenu: false,
        });
    }

    render(): JSX.Element {
        const {
            headerLogo,
            headerLogoUrl,
            appName,
            userAccountMenu,
            applicationSwitcher,
            navigation,
        } = this.props;
        const { showMobileMenu, showAppSwitcherMenu } = this.state;
        const burgerMenuClasses = classNames('burger-menu', { 'burger-menu--open': showMobileMenu });

        return (
            <header className="app__header">
                <div className="layout layout--gutter-none layout--align-middle app__primary-navigation">

                    <div className="layout__item u-fit hide-sm">
                        <div className={burgerMenuClasses}>
                            <Button
                                className="burger-menu__button"
                                appearance="no-style"
                                onClickHandler={() => this._toggleShowMobileMenu(!showMobileMenu)}
                            >
                                <div className="burger-menu__icon" />
                            </Button>
                        </div>
                    </div>


                    <div className="layout__item u-fill">
                        <Link className="app__header__home" to={headerLogoUrl}>
                            <span className="app__header__logo">{headerLogo}</span>
                            <span className="app__header__name show-sm">{appName}</span>
                        </Link>
                    </div>
                    {applicationSwitcher && (
                        <div className="layout__item u-fit">
                            {React.cloneElement(applicationSwitcher, {
                                onToggleMenuHandler: this._toggleAppSwitcherMenuHandler,
                                showMenu: showAppSwitcherMenu,
                            })}
                        </div>
                    )}
                    {userAccountMenu && (
                        <div className="layout__item u-fit show-sm">
                            { userAccountMenu }
                        </div>
                    )}
                </div>
                {navigation && React.cloneElement(navigation, {
                    onCloseMobileMenuHandler: () => this._toggleShowMobileMenu(false),
                    showMobileMenu,
                })}
            </header>
        );
    }
}

export default Header;
