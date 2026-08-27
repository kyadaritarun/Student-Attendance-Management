import React from 'react';

export const AttendanceStats = ({ summary }) => {
  if (!summary) return null;

  const stats = [
    { label: 'Total Sessions', value: summary.total_sessions, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Present', value: summary.present_sessions, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Absent', value: summary.absent_sessions, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Present Streak', value: `${summary.present_streak}`, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 w-full sm:w-[280px]">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-slate-50/80 border border-gray-150 rounded-xl p-2.5 flex flex-col items-start gap-1 shadow-2xs"
        >
          <span className={`text-sm font-extrabold px-2 py-0.5 rounded-md ${s.bg} ${s.color}`}>
            {s.value}
          </span>
          <span className="text-[11px] font-semibold text-gray-500 whitespace-nowrap">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;

