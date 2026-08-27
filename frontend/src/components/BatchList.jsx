import React, { useRef } from 'react';
import BatchCard from './BatchCard';

export const BatchList = ({ batches, selectedBatchId, onSelectBatch }) => {
  const sliderRef = useRef(null);

  if (!batches || batches.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-xs">
        <p className="text-sm font-semibold text-gray-900 mb-1">No Batches Found</p>
        <p className="text-xs text-gray-500 m-0">You are not currently enrolled in any batch.</p>
      </div>
    );
  }

  const scroll = (direction) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 300;
      const gap = 12; // 0.75rem = 12px
      const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-6">
      {/* Header with Navigation Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-gray-900 m-0">My Batches</h3>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
            {batches.length}
          </span>
        </div>

        {/* Slider Navigation Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 text-base font-bold leading-none"
            title="Scroll Left"
            aria-label="Scroll Left"
          >
            ‹
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 text-base font-bold leading-none"
            title="Scroll Right"
            aria-label="Scroll Right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Slider Track */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-3 pb-2 pt-0.5 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="w-full sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)] shrink-0 snap-start min-w-0"
          >
            <BatchCard
              batch={batch}
              isSelected={batch.id === selectedBatchId}
              onClick={() => onSelectBatch(batch.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchList;


