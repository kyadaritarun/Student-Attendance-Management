import React from 'react';

export const StudentProfile = ({ student }) => {
  if (!student) return null;

  return (
    <div style={styles.card} className="card">
      <div style={styles.row}>
        <img
          src={student.profile_image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.student_id}`}
          alt={student.name}
          style={styles.avatar}
        />
        <div>
          <p style={styles.greeting}>Welcome back,</p>
          <h2 style={styles.name}>{student.name}</h2>
          <div style={styles.meta}>
            <span style={styles.idBadge}>{student.student_id}</span>
            <span style={styles.email}>{student.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '20px',
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: '#f0f2f5',
    border: '2px solid #e5e7eb',
    flexShrink: 0,
  },
  greeting: {
    fontSize: '0.82rem',
    color: '#8e8ea0',
    marginBottom: '2px',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
    lineHeight: 1.2,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '6px',
    flexWrap: 'wrap',
  },
  idBadge: {
    background: '#eef0ff',
    color: '#4361ee',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  email: {
    fontSize: '0.8rem',
    color: '#8e8ea0',
  },
};

export default StudentProfile;
