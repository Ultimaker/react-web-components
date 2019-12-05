import React from 'react';

const EyeIconSmall: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
    <svg
        fill="currentColor"
        height="24px"
        width="24px"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M21.9,11.5C21.7,11.3,18.5,6,12,6s-9.7,5.3-9.9,5.5l-.3.5.3.5c.2.2,3.4,5.5,9.9,5.5s9.7-5.3,9.9-5.5l.3-.5ZM12,16a9.9,9.9,0,0,1-7.8-4A9.9,9.9,0,0,1,12,8a9.9,9.9,0,0,1,7.8,4A9.9,9.9,0,0,1,12,16Z" />
        <path d="M12,9a3,3,0,1,0,3,3A2.9,2.9,0,0,0,12,9Zm0,4a1,1,0,1,1,1-1A.9.9,0,0,1,12,13Z" />
    </svg>
);

export { EyeIconSmall };
