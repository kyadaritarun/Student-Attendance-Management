import React from 'react';

export const AttendanceCard = ({ record }) => {
  const isPresent = record.status === 'Present';

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 p-4 mb-2.5 rounded-xl shadow-xs border-l-4 ${
        isPresent ? 'border-l-green-500' : 'border-l-red-500'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-0.5 leading-snug">
            {record.session_title}
          </h4>
          <span className="text-xs text-gray-400">
            {formatDate(record.date)}
          </span>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold flex items-center gap-1 shrink-0 ${
            isPresent
              ? 'bg-green-50 text-green-600 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}
        >
          {isPresent ? '✓ Present' : '✕ Absent'}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-50">
        <span className="text-xs text-gray-400">
          {record.attended_duration} / {record.total_duration} min
        </span>
        <span
          className={`text-xs font-bold ${
            isPresent ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {record.attendance_percentage}%
        </span>
      </div>

      {/* Session Colored Progress Line */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isPresent ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-rose-400'
          }`}
          style={{
            width: `${Math.min(
              100,
              Math.max(0, record.attendance_percentage ?? (isPresent ? 100 : 0))
            )}%`,
          }}
        />
      </div>
    </div>
  );
};

export default AttendanceCard;
