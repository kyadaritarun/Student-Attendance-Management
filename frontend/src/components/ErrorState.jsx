import React from 'react';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry
}) => {
  return (
    <div className="card" style={styles.card}>
      <div style={styles.icon}>⚠️</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.message}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary" style={styles.btn}>
          Try Again
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: '36px 20px',
    textAlign: 'center',
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  icon: {
    fontSize: '2rem',
    marginBottom: '4px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
  },
  message: {
    fontSize: '0.85rem',
    color: '#8e8ea0',
    maxWidth: '320px',
    margin: 0,
  },
  btn: {
    marginTop: '12px',
  },
};

export default ErrorState;
