import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentId.trim()) {
      setErrorMsg('Please enter your Student ID.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(studentId.trim(), password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
        </div>

        <h1 style={styles.title}>Student Attendance</h1>
        <p style={styles.subtitle}>Sign in with your student credentials</p>

        {/* Error */}
        {errorMsg && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>!</span>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="sid">Student ID</label>
            <input
              id="sid"
              type="text"
              className="form-input"
              placeholder="e.g. STU1001"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={isSubmitting}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="pwd">Password</label>
            <input
              id="pwd"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo credentials hint */}
        <div style={styles.hint}>
          <p style={styles.hintLabel}>Demo credentials</p>
          <p style={styles.hintValue}>ID: <strong>STU1001</strong> &nbsp;|&nbsp; Password: <strong>Student@123</strong></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    background: '#f5f6fa',
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '36px 28px 28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  },
  logoRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logo: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: '#4361ee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '0.88rem',
    color: '#8e8ea0',
    textAlign: 'center',
    marginBottom: '24px',
  },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#dc2626',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  hint: {
    marginTop: '20px',
    padding: '12px',
    background: '#f8f9fc',
    borderRadius: '8px',
    border: '1px solid #eef0f3',
    textAlign: 'center',
  },
  hintLabel: {
    fontSize: '0.72rem',
    fontWeight: '600',
    color: '#8e8ea0',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: '4px',
  },
  hintValue: {
    fontSize: '0.82rem',
    color: '#3d3d5c',
  },
};

export default LoginPage;
