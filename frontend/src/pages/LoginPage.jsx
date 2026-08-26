import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
      <div style={styles.card} className="login-card">
        {/* Left Side: Illustration & Branding */}
        <div style={styles.leftCol} className="login-left-col">
          <img
            src={isPasswordFocused ? "/student_logo_eyes_closed.png" : "/student_logo.png"}
            alt="Attendance Management System"
            style={{
              ...styles.illustration,
              transform: isPasswordFocused ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <h2 style={styles.brandingTitle}>Attendance Management System</h2>
          <p style={styles.brandingTagline}>
            Track your course attendance, session breakdown, and present streaks seamlessly.
          </p>
        </div>

        {/* Vertical Divider */}
        <div style={styles.divider} className="login-divider" />

        {/* Right Side: Login Form */}
        <div style={styles.rightCol}>
          <h1 style={styles.title}>Student Login</h1>
          <p style={styles.subtitle}>Sign in with your student credentials</p>

          {/* Error Alert */}
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
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
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
  card: {
    width: '100%',
    maxWidth: '820px',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '36px 32px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '32px',
    flexWrap: 'wrap',
  },
  leftCol: {
    flex: '1 1 320px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '12px',
  },
  illustration: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '16px',
    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  brandingTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  brandingTagline: {
    fontSize: '0.86rem',
    color: '#8e8ea0',
    lineHeight: 1.5,
    maxWidth: '280px',
  },
  divider: {
    width: '1px',
    height: '280px',
    background: '#e5e7eb',
    display: 'block',
    '@media (maxWidth: 720px)': {
      display: 'none',
    }
  },
  rightCol: {
    flex: '1 1 320px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '0.88rem',
    color: '#8e8ea0',
    marginBottom: '20px',
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
};

export default LoginPage;
