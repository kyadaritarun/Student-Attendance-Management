import React from 'react';

export const AttendanceProgress = ({ percentage }) => {
  const safePct = Math.min(100, Math.max(0, percentage || 0));
  const strokeDasharray = `${safePct}, 100`;

  let strokeColor = '#22c55e';
  if (safePct < 75 && safePct >= 50) strokeColor = '#f59e0b';
  else if (safePct < 50) strokeColor = '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg viewBox="0 0 36 36" className="circular-chart">
        <path
          className="circle-bg"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          stroke={strokeColor}
          strokeDasharray={strokeDasharray}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="percentage-text">
          {safePct}%
        </text>
      </svg>
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Overall Attendance
      </span>
    </div>
  );
};

export default AttendanceProgress;
