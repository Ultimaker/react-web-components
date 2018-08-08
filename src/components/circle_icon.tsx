import * as React from 'react';
import classNames from 'classnames';

export type CircleIconStyle = 'primary' | 'secondary' | 'alert';

export interface CircleIconProps {
  /** CSS styling: 'primary' | 'secondary' | 'alert' */
  style?: CircleIconStyle;
  /** Whether the circle should be should displayed in a disabled state */
  disabled?: boolean;
  /** Size of the icon. Include unit */
  size?: string;
}

export const CircleIcon: React.StatelessComponent<CircleIconProps> = ({ style, disabled, size, children }) => {

  return (
    <div className={classNames(`circle-icon icon icon--circle ${style}`, { 'disabled': disabled })} style={{ width: size, height: size }}>
      {children}
    </div>
  );
};

CircleIcon.displayName = "CircleIcon";

export default CircleIcon;