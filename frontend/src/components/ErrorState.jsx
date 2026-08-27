import React from 'react';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
  retryLabel = 'Try Again'
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-9 text-center my-5 shadow-xs flex flex-col items-center gap-1.5">
      <div className="text-3xl mb-1">⚠️</div>
      <h3 className="text-sm font-semibold text-gray-900 m-0">{title}</h3>
      <p className="text-xs text-gray-500 max-w-[320px] m-0">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-3 cursor-pointer">
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
