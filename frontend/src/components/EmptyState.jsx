import React from 'react';

export const EmptyState = ({ title = 'No Data Available', message = 'Nothing to display at this time.' }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-10 text-center my-5 shadow-xs">
      <div className="text-3xl mb-2">📋</div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 m-0">{message}</p>
    </div>
  );
};

export default EmptyState;
