import React from 'react';

export const BatchCard = ({ batch, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.card,
        ...(isSelected ? styles.selected : {}),
      }}
      className="card"
    >
      <div style={styles.top}>
        <span style={styles.code}>{batch.batch_code}</span>
      </div>
      <h3 style={styles.name}>{batch.batch_name}</h3>
      <p style={styles.course}>{batch.course_name}</p>
      <div style={styles.footer}>
        <span style={{
          ...styles.action,
          color: isSelected ? '#4361ee' : '#8e8ea0',
        }}>
          {isSelected ? 'Selected' : 'View Attendance'}
        </span>
        <span style={styles.arrow}>&rsaquo;</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '16px',
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    minWidth: 0,
  },
  selected: {
    borderColor: '#4361ee',
    boxShadow: '0 0 0 2px rgba(67, 97, 238, 0.15)',
  },
  top: {
    marginBottom: '8px',
  },
  code: {
    fontSize: '0.72rem',
    fontWeight: '700',
    color: '#4361ee',
    background: '#eef0ff',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  name: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 4px 0',
    lineHeight: 1.3,
  },
  course: {
    fontSize: '0.8rem',
    color: '#8e8ea0',
    margin: 0,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '14px',
    paddingTop: '10px',
    borderTop: '1px solid #f0f2f5',
  },
  action: {
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  arrow: {
    fontSize: '1.2rem',
    color: '#8e8ea0',
    lineHeight: 1,
  },
};

export default BatchCard;
