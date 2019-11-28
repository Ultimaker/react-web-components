import React from 'react';

const MagnifierIcon: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
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
        <path d="M30,3 C22.3,3 16,9.3 16,17 C16,20.5 17.3,23.7 19.4,26.2 L18.1,27.5 L16.7,26.1 L2.2,40.6 L6.4,44.8 L20.9,30.3 L19.5,28.9 L20.8,27.6 C23.3,29.7 26.5,31 30,31 C37.7,31 44,24.7 44,17 C44,9.3 37.7,3 30,3 Z M6.4,42 L5,40.6 L16.7,28.9 L18.1,30.3 L6.4,42 Z M30,29 C23.4,29 18,23.6 18,17 C18,10.4 23.4,5 30,5 C36.6,5 42,10.4 42,17 C42,23.6 36.6,29 30,29 Z" />
    </svg>
);

export { MagnifierIcon };
