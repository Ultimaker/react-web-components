import * as React from 'react';

import Spinner from './spinner';

export const LoadingPage: React.StatelessComponent = (): JSX.Element => {

    return <div className="loading-page">
      <Spinner />
    </div>
  };

LoadingPage.displayName = "LoadingPage";

export default LoadingPage;
