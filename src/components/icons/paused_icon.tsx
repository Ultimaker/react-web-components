import * as React from 'react';

const PausedIcon: React.StatelessComponent = (): JSX.Element => (
    <div className="icon icon--paused">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16,0A16,16,0,1,0,32,16,16,16,0,0,0,16,0Zm0,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29Z" />
            <rect x="11.5" y="9" width="3" height="14" />
            <rect x="17.5" y="9" width="3" height="14" />
        </svg>
    </div>
)

PausedIcon.displayName = "PausedIcon";

export default PausedIcon;
