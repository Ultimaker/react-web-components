import React from 'react';

const MagnifierIconSmall: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
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
        <path d="M15,1.99999996 C11.1,1.99999996 7.99999996,5.09999997 7.99999996,8.99999996 C7.99999996,10.6 8.49999996,12 9.39999999,13.2 L1.99999996,20.6 L3.39999996,22 L10.8,14.6 C12,15.5 13.4,16 15,16 C18.9,16 22,12.9 22,8.99999996 C22,5.09999997 18.9,1.99999996 15,1.99999996 Z M15,14 C12.2,14 9.99999999,11.8 9.99999999,8.99999997 C9.99999999,6.19999998 12.2,3.99999997 15,3.99999997 C17.8,3.99999997 20,6.19999998 20,8.99999997 C20,11.8 17.8,14 15,14 Z" fill="currentColor" />
    </svg>
);

export { MagnifierIconSmall };
