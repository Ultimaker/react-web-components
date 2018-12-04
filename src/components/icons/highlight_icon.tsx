import * as React from 'react';
import { IconWrapper, IconProps } from './icon_wrapper';

const HighlightIcon: React.StatelessComponent<IconProps> = ({ className }): JSX.Element => (
  <div className={`${className} icon--highlight`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path d="M17,1.54l4.36,8.84,9.76,1.42a1.08,1.08,0,0,1,.6,1.83l-7.06,6.88,1.66,9.72a1.07,1.07,0,0,1-1.55,1.13L16,26.77,7.27,31.36a1.07,1.07,0,0,1-1.55-1.13l1.66-9.72L.32,13.63a1.08,1.08,0,0,1,.6-1.83l9.76-1.42L15,1.54A1.07,1.07,0,0,1,17,1.54Z" />
    </svg>
  </div>
);

HighlightIcon.displayName = 'HighlightIcon';

export default IconWrapper(HighlightIcon);
