import React from 'react';

function LoadingAnimation() {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          width: '1.25em',
          height: '1.25em',
          borderRadius: '50%',
          border: '2px solid black',
          borderTopColor: 'white',
          animation: 'spin 0.75s infinite linear',
        }}
      >
        <span className="sr-only">Loading...</span>
      </div>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default LoadingAnimation;