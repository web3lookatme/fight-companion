import React from 'react';

const FighterCardSkeleton: React.FC = () => {
  return (
    <div className="bg-charcoal rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-64 bg-onyx"></div>
      <div className="p-4">
        <div className="h-8 bg-onyx rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-onyx rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default FighterCardSkeleton;
