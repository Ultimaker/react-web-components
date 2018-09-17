import * as React from 'react';

const SingleArrowIcon: React.StatelessComponent = (): JSX.Element => (
    <div className="icon icon--single-arrow">
        <svg viewBox="0 0 11 7">
            <path d=" M 5.5 4.172 L 9.5 0.172 L 10.914 1.586 L 6.914 5.586 L 5.5 7 L 0.086 1.586 L 1.5 0.172 L 5.5 4.172 Z" />
        </svg>
    </div>
)

SingleArrowIcon.displayName = "SingleArrowIcon";

export default SingleArrowIcon;
