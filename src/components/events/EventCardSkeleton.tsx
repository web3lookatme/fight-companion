import React from 'react';

const EventCardSkeleton: React.FC = () => {
  return (
    <div className="bg-charcoal rounded-lg shadow-2xl overflow-hidden animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1 bg-onyx h-64 md:h-full"></div>
        <div className="md:col-span-2 p-8">
          <div className="h-10 bg-onyx rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-onyx rounded w-1/2 mb-8"></div>
          <div className="h-8 bg-onyx rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            <div className="h-6 bg-onyx rounded w-full"></div>
            <div className="h-6 bg-onyx rounded w-5/6"></div>
            <div className="h-6 bg-onyx rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
