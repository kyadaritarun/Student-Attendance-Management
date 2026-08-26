import React from 'react';

export const AttendanceStats = ({ summary }) => {
  if (!summary) return null;

  const stats = [
    { label: 'Total Sessions', value: summary.total_sessions, color: '#4361ee', bg: '#eef0ff' },
    { label: 'Present', value: summary.present_sessions, color: '#22c55e', bg: '#f0fdf4' },
    { label: 'Absent', value: summary.absent_sessions, color: '#ef4444', bg: '#fef2f2' },
    { label: 'Present Streak', value: `${summary.present_streak}`, color: '#f59e0b', bg: '#fffbeb' },
  ];

  return (
    <div style={styles.grid}>
      {stats.map((s) => (
        <div key={s.label} style={styles.stat}>
          <span style={{ ...styles.dot, background: s.bg, color: s.color }}>{s.value}</span>
          <span style={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  stat: {
    background: '#fafbfc',
    border: '1px solid #f0f2f5',
    borderRadius: '10px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
  },
  dot: {
    fontSize: '1.3rem',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '8px',
  },
  label: {
    fontSize: '0.78rem',
    fontWeight: '500',
    color: '#8e8ea0',
  },
};

export default AttendanceStats;
