import React from 'react';
import AttendanceProgress from './AttendanceProgress';
import AttendanceStats from './AttendanceStats';

export const AttendanceSummary = ({ batch, summary }) => {
  if (!batch || !summary) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-xs">
      {/* Batch header */}
      <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-100 flex-wrap gap-2">
        <h2 className="text-lg font-bold text-gray-900 m-0">
          {batch.name}
        </h2>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
          {batch.batch_code}
        </span>
      </div>

      {/* Progress + Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-10 py-1">
        <div className="shrink-0">
          <AttendanceProgress summary={summary} />
        </div>
        <div className="shrink-0">
          <AttendanceStats summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
