import * as React from 'react';

// components
import SlideOutContainer from './slide_out_container';

export interface SubNavigationMobileMenuProps {
    menuLabel: string | JSX.Element | JSX.Element[];
}

export interface SubNavigationMobileMenuState {
    isOpen: boolean;
}

export class SubNavigationMobileMenu extends
    React.Component<SubNavigationMobileMenuProps, SubNavigationMobileMenuState> {
    state = {
        isOpen: false,
    }

    private _toggleShowAccountNav(isOpen: boolean): void {
        this.setState({
            isOpen,
        });
    }

    render(): JSX.Element {
        const { menuLabel, children } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="sub-navigation-mobile-menu">
                <SlideOutContainer
                    isOpen={isOpen}
                    panelArrowWidth="1.2rem"
                    headerText={menuLabel}
                    onHeaderClick={
                        () => this._toggleShowAccountNav(!isOpen)
                    }
                >
                    {children}
                </SlideOutContainer>
            </div>
        );
    }
}

export default SubNavigationMobileMenu;
