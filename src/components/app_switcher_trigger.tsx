import * as React from 'react';
import classNames from 'classnames';

export interface AppSwitcherTriggerProps {
    isAppSwitcherOpen: boolean;
}

export const AppSwitcherTrigger: React.FC<AppSwitcherTriggerProps> = ({
    isAppSwitcherOpen,
}) => {
    const classes = classNames('app_switcher_trigger', { 'app_switcher_trigger--open': isAppSwitcherOpen });

    return (
        <div className={classes}>
            <div className="grid-icon">
                <span className="layer layer--primary">
                    <span />
                </span>
                <span className="layer layer--secondary">
                    <span />
                </span>
                <span className="layer layer--tertiary">
                    <span />
                </span>
            </div>
        </div>
    );
};

AppSwitcherTrigger.displayName = 'AppSwitcherTrigger';

export default AppSwitcherTrigger;
