import React from 'react';
import BatchCard from './BatchCard';

export const BatchList = ({ batches, selectedBatchId, onSelectBatch }) => {
  if (!batches || batches.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-xs">
        <p className="text-sm font-semibold text-gray-900 mb-1">No Batches Found</p>
        <p className="text-xs text-gray-500 m-0">You are not currently enrolled in any batch.</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-gray-900 m-0">My Batches</h3>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
          {batches.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

export default BatchList;
