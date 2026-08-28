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
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f5f6fa]">
      <div className="w-full max-w-[820px] bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
        
       
        <div className="hidden sm:flex flex-1 flex-col items-center text-center p-3">
          <img
            src={isPasswordFocused ? "/student_logo_eyes_closed.png" : "/student_logo.png"}
            alt="Attendance Management System"
            className={`w-44 h-44 object-contain mb-4 transition-transform duration-300 ${
              isPasswordFocused ? 'scale-105' : 'scale-100'
            }`}
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Attendance Management System
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-[280px] leading-relaxed">
            Track your course attendance, session breakdown, and present streaks seamlessly.
          </p>
        </div>

      
        <div className="hidden md:block w-px h-64 bg-gray-200" />

      
        <div className="w-full md:flex-1 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Student Login
          </h1>
          <p className="text-sm text-gray-500 mb-5">
            Sign in with your student credentials
          </p>

         
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3.5 py-2.5 rounded-lg text-sm mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                !
              </span>
              <span>{errorMsg}</span>
            </div>
          )}

         
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5" htmlFor="sid">
                Student ID
              </label>
              <input
                id="sid"
                type="text"
                className="w-full bg-white border border-gray-300 text-gray-900 px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all"
                placeholder="e.g. STU1001"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                disabled={isSubmitting}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-1.5" htmlFor="pwd">
                Password
              </label>
              <input
                id="pwd"
                type="password"
                className="w-full bg-white border border-gray-300 text-gray-900 px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/15 transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
