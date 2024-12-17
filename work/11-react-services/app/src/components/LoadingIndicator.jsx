import React from 'react';
import loadingSvg from '../assets/loading.svg';

function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <img src={loadingSvg} className="loading" alt="Loading..." />
    </div>
  );
}

export default LoadingIndicator;