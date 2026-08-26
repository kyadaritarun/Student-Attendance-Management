import React from 'react';

export const AttendanceProgress = ({ percentage }) => {
  const safePct = Math.min(100, Math.max(0, percentage || 0));
  const strokeDasharray = `${safePct}, 100`;

  let strokeColor = '#22c55e';
  if (safePct < 75 && safePct >= 50) strokeColor = '#f59e0b';
  else if (safePct < 50) strokeColor = '#ef4444';

  return (
    <div style={styles.wrapper}>
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
      <span style={styles.label}>Overall Attendance</span>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#8e8ea0',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  },
};

export default AttendanceProgress;
