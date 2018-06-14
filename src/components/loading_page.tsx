import * as React from 'react';

import Spinner from './spinner';

const LoadingPage: React.StatelessComponent = (): JSX.Element => {

    return <div className="loading-page">
      <Spinner />
    </div>
  };

export default LoadingPage;
