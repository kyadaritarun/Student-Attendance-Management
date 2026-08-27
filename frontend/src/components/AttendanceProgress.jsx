import React from 'react';

export const AttendanceProgress = ({ summary, percentage }) => {
  const safePct = Math.min(100, Math.max(0, summary ? summary.attendance_percentage : percentage || 0));
  
  const total = summary ? summary.total_sessions || 1 : 100;
  const presentCount = summary ? summary.present_sessions || 0 : Math.round(safePct);
  const absentCount = summary ? summary.absent_sessions || 0 : Math.max(0, total - presentCount);
  
  const presentPct = total > 0 ? (presentCount / total) * 100 : safePct;
  const absentPct = total > 0 ? (absentCount / total) * 100 : (100 - safePct);

  // SVG Circumference is 100.
  const presentDash = `${presentPct}, 100`;
  const absentDash = `${absentPct}, 100`;
  const absentOffset = -presentPct;

  let mainColor = '#22c55e'; // Green
  let badgeBg = 'bg-green-50 text-green-700 border-green-200';
  let statusText = '✓ Safe Zone (≥75%)';

  if (safePct < 75 && safePct >= 60) {
    mainColor = '#f59e0b'; // Amber
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    statusText = '⚠️ Warning (<75%)';
  } else if (safePct < 60) {
    mainColor = '#ef4444'; // Red
    badgeBg = 'bg-red-50 text-red-700 border-red-200';
    statusText = '🚨 Critical (<60%)';
  }

  return (
    <div className="flex flex-col items-center gap-2.5 w-full">
      {/* Multi-Colored SVG Circular Donut Chart */}
      <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 36 36" className="circular-chart">
          {/* Base background ring */}
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          
          {/* Present Arc (Green) */}
          {presentPct > 0 && (
            <path
              className="circle"
              stroke="#22c55e"
              strokeDasharray={presentDash}
              strokeDashoffset="0"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          )}

          {/* Absent Arc (Red) */}
          {absentPct > 0 && (
            <path
              className="circle"
              stroke="#ef4444"
              strokeDasharray={absentDash}
              strokeDashoffset={absentOffset}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          )}

          <text x="18" y="20.35" className="percentage-text" style={{ fill: mainColor }}>
            {safePct}%
          </text>
        </svg>
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">
          Overall Attendance
        </span>
      </div>

      {/* Multi-Colored Stacked Progress Line Bar */}
      <div className="w-full max-w-[290px] mt-1">
        {/* Top Header Labels */}
        <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-1.5 px-0.5">
          <span className="text-green-600 flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
            {presentPct.toFixed(1)}% Present
          </span>  
          {absentPct > 0 && (
            <span className="text-red-600 flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
              {absentPct.toFixed(1)}% Absent
            </span>
          )}
        </div>

        {/* Multi-Colored Stacked Line Bar */}
        <div className="relative w-full h-3.5 bg-gray-100 rounded-full flex overflow-hidden border border-gray-200 shadow-inner">
          {/* Green Present Segment */}
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-700"
            style={{ width: `${presentPct}%` }}
            title={`Present: ${presentCount} sessions (${presentPct.toFixed(1)}%)`}
          />
          {/* Red Absent Segment */}
          <div
            className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-700"
            style={{ width: `${absentPct}%` }}
            title={`Absent: ${absentCount} sessions (${absentPct.toFixed(1)}%)`}
          />
          {/* 75% Target Line Marker */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-indigo-600 shadow-xs z-10"
            style={{ left: '75%' }}
            title="75% Minimum Attendance Target"
          />
        </div>

        {/* Bottom Legend Labels */}
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0.5">
          <span>0%</span>
          <span className="text-indigo-600 font-bold">Target: 75%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceProgress;

