import React from 'react';

export const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="py-8 px-4 flex flex-col items-center">
      <div className="w-7 h-7 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin-custom mb-3" />
      <p className="text-xs sm:text-sm text-gray-500 mb-5">{message}</p>
      <div className="w-full max-w-[500px] space-y-3">
        <div className="h-20 rounded-xl skeleton" />
        <div className="h-32 rounded-xl skeleton" />
        <div className="h-16 rounded-xl skeleton" />
      </div>
    </div>
  );
};

export default LoadingState;
