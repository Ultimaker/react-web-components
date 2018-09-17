import * as React from 'react';

const CameraIcon: React.StatelessComponent = (): JSX.Element => (
    <div className="icon icon--camera">
        <svg width="24px" height="16px" viewBox="0 0 24 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.566,1.5556839 L23.566,13.5532035 L19.122,11.7815927 L19.122,15.5 L0.566,15.5 L0.566,0.5 L19.121,0.5 L19.121,3.3291784 L23.566,1.5556839 Z M2.566,2.5 L2.566,13.5 L17.122,13.5 L17.122,11.044 C17.122,9.9835498 18.1924008,9.2579431 19.1774639,9.6506372 L21.566,10.6028326 L21.566,4.5069705 L19.1768685,5.4602014 C18.191748,5.8532512 17.121,5.1276369 17.121,4.067 L17.121,2.5 L2.566,2.5 Z" id="Shape"></path>
        </svg>
    </div>
)

CameraIcon.displayName = "CameraIcon";

export default CameraIcon;
