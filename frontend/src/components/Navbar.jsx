import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-xs">
            <svg className="w-5 h-5 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <span className="text-base font-bold text-gray-900">
            Student Attendance
          </span>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="bg-transparent hover:bg-red-50 text-red-600 border border-red-200 rounded-md px-3.5 py-1.5 text-xs font-semibold cursor-pointer transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
