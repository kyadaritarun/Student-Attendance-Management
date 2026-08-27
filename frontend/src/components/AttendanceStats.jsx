import React from 'react';

export const AttendanceStats = ({ summary }) => {
  if (!summary) return null;

  const stats = [
    { label: 'Total Sessions', value: summary.total_sessions, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Present', value: summary.present_sessions, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Absent', value: summary.absent_sessions, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Present Streak', value: `${summary.present_streak}`, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stats.map((s) => (
        <div key={s.label} className="bg-slate-50/70 border border-gray-100 rounded-xl p-3.5 flex flex-col items-start gap-1.5">
          <span className={`text-xl font-bold px-2.5 py-1 rounded-lg ${s.bg} ${s.color}`}>
            {s.value}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;
