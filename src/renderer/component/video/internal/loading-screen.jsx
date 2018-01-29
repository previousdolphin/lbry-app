import React from 'react';
import Spinner from 'component/common/spinner';

const LoadingScreen = ({ status, spinner = true }) => (
  <div className="video__loading-screen">
      {spinner && <Spinner />}

      <span className="video__loading-text">{status}</span>
    </div>
);

export default LoadingScreen;
