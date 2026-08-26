import React from 'react';
import BatchCard from './BatchCard';

export const BatchList = ({ batches, selectedBatchId, onSelectBatch }) => {
  if (!batches || batches.length === 0) {
    return (
      <div className="card" style={styles.empty}>
        <p style={styles.emptyTitle}>No Batches Found</p>
        <p style={styles.emptyText}>You are not currently enrolled in any batch.</p>
      </div>
    );
  }

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <h3 style={styles.title}>My Batches</h3>
        <span style={styles.count}>{batches.length}</span>
      </div>

      <div style={styles.grid}>
        {batches.map((batch) => (
          <BatchCard
            key={batch.id}
            batch={batch}
            isSelected={batch.id === selectedBatchId}
            onClick={() => onSelectBatch(batch.id)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  count: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#8e8ea0',
    background: '#f0f2f5',
    padding: '2px 10px',
    borderRadius: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
  },
  empty: {
    padding: '32px',
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

export default BatchList;
