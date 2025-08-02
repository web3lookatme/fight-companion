import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/motion/AnimatedPage';
import { useStore } from '../store';
import EventCardSkeleton from '../components/events/EventCardSkeleton';

// ... (imports remain the same)

const Events: React.FC = () => {
  const { events, loading, error, fetchEvents } = useStore();

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

  return (
    <AnimatedPage>
      <div>
        <h1 className="text-6xl text-white tracking-wider mb-4 uppercase font-bold">Upcoming <span className="text-gold">Events</span></h1>
        <p className="text-lg text-medium-gray mb-12">Stay up-to-date with the latest fight cards and schedules.</p>
        
        {error && <p className="text-center text-red-500">{error}</p>}
        {!error && (
          <div className="space-y-16">
            {loading && events.length === 0 ? (
              Array.from({ length: 2 }).map((_, index) => <EventCardSkeleton key={index} />)
            ) : (
              events.map(event => (
                <Link to={`/events/${event.id}`} key={event.id} className="block bg-charcoal rounded-lg shadow-2xl shadow-black/30 overflow-hidden group">
                  {/* ... (event card content remains the same) */}
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Events;