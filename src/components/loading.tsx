import * as React from 'react';

export interface LoadingProps {
    /** Text to be displayed in the loading label */
    label: string;
}

export const Loading: React.StatelessComponent<LoadingProps> = ({ label }): JSX.Element => (
  <div className="loader">
    {label}
    <span>
      <span className="loader__dot">.</span>
      <span className="loader__dot">.</span>
      <span className="loader__dot">.</span>
    </span>
  </div>
);

Loading.displayName = 'Loading';

export default Loading;
