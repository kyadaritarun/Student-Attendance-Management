import React, { useState } from 'react';
import AttendanceCard from './AttendanceCard';

export const AttendanceList = ({ attendance }) => {
  const [filter, setFilter] = useState('All');

  if (!attendance || attendance.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-xs">
        <p className="text-sm font-semibold text-gray-900 mb-1">No Attendance Records</p>
        <p className="text-xs text-gray-500 m-0">No sessions have been recorded for this batch yet.</p>
      </div>
    );
  }

  const filtered = attendance.filter((item) => {
    if (filter === 'Present') return item.status === 'Present';
    if (filter === 'Absent') return item.status === 'Absent';
    return true;
  });

  const presentCount = attendance.filter((i) => i.status === 'Present').length;
  const absentCount = attendance.filter((i) => i.status === 'Absent').length;

  const filters = [
    { key: 'All', label: `All (${attendance.length})` },
    { key: 'Present', label: `Present (${presentCount})` },
    { key: 'Absent', label: `Absent (${absentCount})` },
  ];

  return (
    <div className="mb-10">
      <div className="mb-3">
        <h3 className="text-base font-bold text-gray-900 m-0">Attendance Details</h3>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              filter === f.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Records */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-xs">
          <p className="text-xs text-gray-500 m-0">No "{filter}" records found.</p>
        </div>
      ) : (
        <div>
          {filtered.map((record) => (
            <AttendanceCard key={record.session_id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
