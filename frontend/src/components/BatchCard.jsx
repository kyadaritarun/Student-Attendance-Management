import React from 'react';

export const BatchCard = ({ batch, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border p-4 rounded-xl cursor-pointer transition-all duration-150 shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-600/15'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="mb-2">
        <span className="text-[11.5px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
          {batch.batch_code}
        </span>
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
        {batch.batch_name}
      </h3>
      <p className="text-xs text-gray-500 m-0">
        {batch.course_name}
      </p>
      <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-gray-100">
        <span
          className={`text-xs font-semibold ${
            isSelected ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          {isSelected ? 'Selected' : 'View Attendance'}
        </span>
        <span className="text-base text-gray-400 leading-none">&rsaquo;</span>
      </div>
    </div>
  );
};

export default BatchCard;
