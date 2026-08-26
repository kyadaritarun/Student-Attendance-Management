import React from 'react';
import AttendanceProgress from './AttendanceProgress';
import AttendanceStats from './AttendanceStats';

export const AttendanceSummary = ({ batch, summary }) => {
  if (!batch || !summary) return null;

  return (
    <div className="card" style={styles.card}>
      {/* Batch header */}
      <div style={styles.batchHeader}>
        <h2 style={styles.batchName}>{batch.name}</h2>
        <span style={styles.code}>{batch.batch_code}</span>
      </div>

      {/* Progress + Stats */}
      <div style={styles.body}>
        <div style={styles.progressCol}>
          <AttendanceProgress percentage={summary.attendance_percentage} />
        </div>
        <div style={styles.statsCol}>
          <AttendanceStats summary={summary} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '20px',
    marginBottom: '24px',
  },
  batchHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f0f2f5',
    flexWrap: 'wrap',
    gap: '8px',
  },
  batchName: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  code: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#4361ee',
    background: '#eef0ff',
    padding: '3px 10px',
    borderRadius: '4px',
  },
  body: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  progressCol: {
    flex: '0 0 auto',
    padding: '8px 0',
  },
  statsCol: {
    flex: 1,
    minWidth: '200px',
  },
};

export default AttendanceSummary;
