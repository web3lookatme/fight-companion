import React from 'react';

const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-charcoal rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-onyx"></div>
      <div className="p-6">
        <div className="h-6 bg-onyx rounded w-full mb-4"></div>
        <div className="h-6 bg-onyx rounded w-3/4 mb-6"></div>
        <div className="h-4 bg-onyx rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-onyx rounded w-full"></div>
        <div className="h-4 bg-onyx rounded w-full mt-2"></div>
        <div className="h-4 bg-onyx rounded w-2/3 mt-2"></div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
