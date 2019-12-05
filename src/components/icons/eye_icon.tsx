import React from 'react';

const EyeIcon: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
    <svg
        fill="currentColor"
        height="48px"
        width="48px"
        viewBox="0 0 48 48"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M43.8,23.4C43.5,23,36.4,13,24,13S4.5,23,4.2,23.4l-.4.6.4.6C4.5,25,11.6,35,24,35S43.5,25,43.8,24.6l.4-.6ZM33,24a9,9,0,1,1-9-9A9,9,0,0,1,33,24ZM6.3,24a25.9,25.9,0,0,1,9.4-7.2,11,11,0,0,0,0,14.4A25.9,25.9,0,0,1,6.3,24Zm26,7.2a10.9,10.9,0,0,0,0-14.4A25.9,25.9,0,0,1,41.7,24,25.9,25.9,0,0,1,32.3,31.2Z"/>
        <path d="M24,27a3,3,0,1,0-3-3A2.9,2.9,0,0,0,24,27Zm0-4a1,1,0,1,1-1,1A.9.9,0,0,1,24,23Z"/>
    </svg>
);

export { EyeIcon };
