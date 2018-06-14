import * as React from 'react';

export interface LoadingProps {
  label: string;
}

const Loading: React.StatelessComponent<LoadingProps> =
  ({ label }): JSX.Element => {

    return <div className="loader">
      {label}
      <span><span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></span>
    </div>
  };

export default Loading;
