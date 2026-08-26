import React, { useState } from 'react';
import AttendanceCard from './AttendanceCard';

export const AttendanceList = ({ attendance }) => {
  const [filter, setFilter] = useState('All');

  if (!attendance || attendance.length === 0) {
    return (
      <div className="card" style={styles.empty}>
        <p style={styles.emptyTitle}>No Attendance Records</p>
        <p style={styles.emptyText}>No sessions have been recorded for this batch yet.</p>
      </div>
    );
  }

  const filtered = attendance.filter((item) => {
    if (filter === 'Present') return item.status === 'Present';
    if (filter === 'Absent') return item.status === 'Absent';
    return true;
  });

  const presentCount = attendance.filter((i) => i.status === 'Present').length;
  const absentCount = attendance.filter((i) => i.status === 'Absent').length;

  const filters = [
    { key: 'All', label: `All (${attendance.length})` },
    { key: 'Present', label: `Present (${presentCount})` },
    { key: 'Absent', label: `Absent (${absentCount})` },
  ];

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <h3 style={styles.title}>Attendance Details</h3>
      </div>

      {/* Filter tabs */}
      <div style={styles.tabs}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              ...styles.tab,
              ...(filter === f.key ? styles.activeTab : {}),
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Records */}
      {filtered.length === 0 ? (
        <div className="card" style={styles.emptyFilter}>
          <p style={styles.emptyText}>No "{filter}" records found.</p>
        </div>
      ) : (
        <div>
          {filtered.map((record) => (
            <AttendanceCard key={record.session_id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '40px',
  },
  header: {
    marginBottom: '12px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  tabs: {
    display: 'flex',
    gap: '6px',
    marginBottom: '16px',
  },
  tab: {
    background: '#f0f2f5',
    color: '#8e8ea0',
    border: 'none',
    padding: '7px 14px',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease',
  },
  activeTab: {
    background: '#4361ee',
    color: '#ffffff',
  },
  empty: {
    padding: '32px',
    textAlign: 'center',
  },
  emptyFilter: {
    padding: '24px',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '4px',
  },
  emptyText: {
    fontSize: '0.82rem',
    color: '#8e8ea0',
    margin: 0,
  },
};

export default AttendanceList;
