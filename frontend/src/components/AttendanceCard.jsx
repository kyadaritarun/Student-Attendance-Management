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
      className="card"
      style={{
        ...styles.card,
        borderLeft: isPresent ? '3px solid #22c55e' : '3px solid #ef4444',
      }}
    >
      <div style={styles.top}>
        <div>
          <h4 style={styles.title}>{record.session_title}</h4>
          <span style={styles.date}>{formatDate(record.date)}</span>
        </div>
        <span className={isPresent ? 'badge-present' : 'badge-absent'}>
          {isPresent ? '✓ Present' : '✕ Absent'}
        </span>
      </div>

      <div style={styles.bottom}>
        <span style={styles.duration}>
          {record.attended_duration} / {record.total_duration} min
        </span>
        <span style={{
          ...styles.pct,
          color: isPresent ? '#22c55e' : '#ef4444',
        }}>
          {record.attendance_percentage}%
        </span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '14px 16px',
    marginBottom: '10px',
    borderRadius: '10px',
  },
  top: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  title: {
    fontSize: '0.92rem',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: '0 0 3px 0',
    lineHeight: 1.3,
  },
  date: {
    fontSize: '0.78rem',
    color: '#8e8ea0',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
    paddingTop: '8px',
    borderTop: '1px solid #f5f6fa',
  },
  duration: {
    fontSize: '0.8rem',
    color: '#8e8ea0',
  },
  pct: {
    fontSize: '0.85rem',
    fontWeight: '700',
  },
};

export default AttendanceCard;
