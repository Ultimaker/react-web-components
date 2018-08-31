import * as React from 'react';

const RejectedIcon: React.StatelessComponent = (): JSX.Element => (
    <div className="icon icon--rejected">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M17.69,28.89a13,13,0,0,0,11.2-11.2,12.75,12.75,0,0,0,0-3.38,13,13,0,1,0-11.2,14.58ZM9.28,11.4,11.4,9.28l4.6,4.6,4.6-4.6,2.12,2.12L18.12,16l4.6,4.6L20.6,22.72,16,18.12l-4.6,4.6L9.28,20.6l4.6-4.6Z" fill="none" />
            <path d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm1.69,28.89a13,13,0,1,1,11.2-14.58,12.75,12.75,0,0,1,0,3.38A13,13,0,0,1,17.69,28.89Z" />
            <polygon points="11.4 22.72 16 18.12 20.6 22.72 22.72 20.6 18.12 16 22.72 11.4 20.6 9.28 16 13.88 11.4 9.28 9.28 11.4 13.88 16 9.28 20.6 11.4 22.72" />
        </svg>
    </div>
)

RejectedIcon.displayName = "RejectedIcon";

export default RejectedIcon;
