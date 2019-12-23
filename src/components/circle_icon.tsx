import * as React from 'react';
import classNames from 'classnames';

export type CircleIconStyle = 'primary' | 'secondary' | 'alert';

export interface CircleIconProps {
    /** CSS styling: 'primary' | 'secondary' | 'alert' */
    appearance?: CircleIconStyle;
    /** Whether the circle should be should displayed in a disabled state */
    disabled?: boolean;
    /** Size of the icon. Include unit */
    size?: string;
}

export const CircleIcon: React.FC<CircleIconProps> = ({
    appearance, disabled, size, children,
}) => (
    <div
        className={classNames(`circle-icon icon icon--circle ${appearance}`, { disabled })}
        style={size ? { width: size, height: size } : undefined}
    >

        {children}
    </div>
);

CircleIcon.defaultProps = {
    appearance: 'primary',
};

CircleIcon.displayName = 'CircleIcon';

export default CircleIcon;
