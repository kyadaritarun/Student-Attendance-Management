import React from 'react';

export const EmptyState = ({ title = 'No Data Available', message = 'Nothing to display at this time.' }) => {
  return (
    <div className="card" style={styles.card}>
      <div style={styles.icon}>📋</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  card: {
    padding: '40px 20px',
    textAlign: 'center',
    margin: '20px 0',
  },
  icon: {
    fontSize: '2rem',
    marginBottom: '8px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '4px',
  },
  message: {
    fontSize: '0.85rem',
    color: '#8e8ea0',
    margin: 0,
  },
};

export default EmptyState;
