// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// components
import Button from './button';
import UltimakerLogo from './icons/ultimaker_logo';

export interface HeaderProps {
    headerLogo?: JSX.Element;
    headerLogoUrl?: string;
    appName?: string;
    userAccountMenu?: JSX.Element;
    applicationSwitcher?: JSX.Element;
    children?: JSX.Element;
}

export interface HeaderState {
    showMobileMenu: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    static defaultProps = {
        headerLogo: <UltimakerLogo />,
        headerLogoUrl: '/',
    };

    state = {
        showMobileMenu: false,
    }

    private _toggleShowMobileMenu(showMobileMenu: boolean): void {
        if (showMobileMenu) {
            document.body.classList.add('noscroll');
        } else {
            document.body.classList.remove('noscroll');
        }

        this.setState({
            showMobileMenu,
        });
    }

    render(): JSX.Element {
        const {
            headerLogo,
            headerLogoUrl,
            appName,
            userAccountMenu,
            applicationSwitcher,
            children,
        } = this.props;
        const { showMobileMenu } = this.state;
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
                            { applicationSwitcher }
                        </div>
                    )}
                    {userAccountMenu && (
                        <div className="layout__item u-fit show-sm">
                            { userAccountMenu }
                        </div>
                    )}
                </div>
                {React.Children.map(children, (child: JSX.Element) => (
                    React.cloneElement(child, {
                        onCloseMobileMenuHandler: () => this._toggleShowMobileMenu(false),
                        showMobileMenu,
                    })
                ))}
            </header>
        );
    }
}

export default Header;
