import * as React from 'react';

import CircleIcon from './circle_icon';
import ProfileIcon from './icons/profile_icon';

export interface CircleIconProps {
  size: string;
}


export const DefaultProfileIcon: React.StatelessComponent<CircleIconProps> = ({ size }) => {

  return <div className="default-profile-icon">
    <CircleIcon style="primary" disabled size={size} >
      <ProfileIcon />
    </CircleIcon>
  </div>
};

DefaultProfileIcon.displayName = "DefaultProfileIcon";

export default DefaultProfileIcon;