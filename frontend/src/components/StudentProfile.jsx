import React from 'react';

export const StudentProfile = ({ student }) => {
  if (!student) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 shadow-xs">
      <div className="flex items-center gap-4">
        <img
          src={student.profile_image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.student_id}`}
          alt={student.name}
          className="w-14 h-14 rounded-full bg-gray-100 border-2 border-gray-200 shrink-0 object-cover"
        />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Welcome back,</p>
          <h2 className="text-lg font-bold text-gray-900 m-0 leading-tight">
            {student.name}
          </h2>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-semibold">
              {student.student_id}
            </span>
            <span className="text-xs text-gray-400">
              {student.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
