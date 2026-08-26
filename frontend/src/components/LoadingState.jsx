import React from 'react';

export const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <p style={styles.msg}>{message}</p>
      <div style={styles.skeletons}>
        <div style={styles.sk1} className="skeleton" />
        <div style={styles.sk2} className="skeleton" />
        <div style={styles.sk3} className="skeleton" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '32px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  spinner: {
    width: '28px',
    height: '28px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#4361ee',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
    marginBottom: '12px',
  },
  msg: {
    fontSize: '0.88rem',
    color: '#8e8ea0',
    marginBottom: '20px',
  },
  skeletons: {
    width: '100%',
    maxWidth: '500px',
  },
  sk1: { height: '80px', marginBottom: '12px', borderRadius: '10px' },
  sk2: { height: '120px', marginBottom: '12px', borderRadius: '10px' },
  sk3: { height: '60px', borderRadius: '10px' },
};

export default LoadingState;
