import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Motion, spring } from 'react-motion';

import Button from './button';

export interface NavRoute {
    path: string;
    label: string;
    visible?: boolean;
    component: React.ComponentClass | React.StatelessComponent;
    scopes?: string[];
    props?: object;
}

export interface NavigationProps {
    navLinks: NavRoute[];
}

export interface NavigationState {
    showNav: boolean;
}

const motion = { stiffness: 999, damping: 50 };

export default class Navigation extends React.Component<NavigationProps, NavigationState> {

    state = {
        showNav: false
    }

    private _toggleShowNav(showNav: boolean): void {
        if (showNav) {
            document.body.classList.add('noscroll');
        }
        else {
            document.body.classList.remove('noscroll')
        }

        this.setState({
            showNav: showNav
        })
    }

    render(): JSX.Element {
        const { navLinks, children } = this.props;
        const { showNav } = this.state;

        const burgerIconClasses = classNames('burger-menu__icon', { 'open': showNav });
        const navClasses = classNames('navigation', { 'open': showNav });
        const visibleNavLinks = navLinks.filter((navLink) => navLink.visible);

        return <nav className={navClasses} onClick={() => this._toggleShowNav(false)}>

            {visibleNavLinks.length > 0 &&
                <div className="nav-links-container">
                    <div className="burger-menu show-xs">
                        <Button style="primary" shape="circle" onClickHandler={() => this._toggleShowNav(!showNav)}>
                            <div className={burgerIconClasses} />
                        </Button>
                    </div>


                    <Motion style={{ x: spring(showNav ? 56 : 0, motion) }}>
                        {({ x }) =>
                            <ul>
                                {visibleNavLinks.map((navLink, index) => {
                                    return <li key={navLink.path} style={{ top: `${(index + 1) * x}px` }}>
                                        <NavLink to={navLink.path} activeClassName="active">
                                            <span className="label">{navLink.label}</span>
                                        </NavLink>
                                    </li>
                                })}
                            </ul>
                        }
                    </Motion>

                    {children &&
                        <div className="children-containter">
                            {children}
                        </div>
                    }

                </div>
            }

        </nav >
    };
}
