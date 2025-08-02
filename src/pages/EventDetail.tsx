import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import type { Event, Fighter } from '../types';
import AnimatedPage from '../components/motion/AnimatedPage';
import Spinner from '../components/ui/Spinner';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fighters, fetchFighters, fetchEventById, fetchComments, loading, error } = useStore();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const currentEvent = await fetchEventById(id);
        setEvent(currentEvent || null);
        await fetchComments(`event-${id}`);
      }
      if (fighters.length === 0) {
        fetchFighters();
      }
    };
    loadData();
  }, [id, fetchEventById, fetchComments, fighters.length, fetchFighters]);

  const getFighterId = (fighterName: string): number | undefined => {
    const fighter = fighters.find((f: Fighter) => f.name === fighterName);
    return fighter?.id;
  };

  if (loading && !event) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return <div className="text-white text-center text-4xl py-20">Event not found.</div>;

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        <div className="relative bg-charcoal p-8 rounded-lg shadow-2xl shadow-black/40 overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img src={event.image} alt={event.name} className="w-full h-full object-cover opacity-10 object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal to-transparent"></div>
          </div>
          <div className="relative text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-wider">{event.name}</h1>
            <p className="text-3xl text-gold mt-4">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-xl text-medium-gray mt-2">{event.location}</p>
          </div>
        </div>

        <div className="bg-charcoal p-8 rounded-lg shadow-xl">
          <h2 className="text-4xl text-gold font-bold border-b-2 border-gold/20 pb-3 mb-6 uppercase tracking-widest">Main Card</h2>
          <ul className="space-y-4">
            {event.main_card.map((fight, index) => {
              const [fighter1Name, fighter2Name] = fight.match.split(' vs. ');
              const fighter1Id = getFighterId(fighter1Name);
              const fighter2Id = getFighterId(fighter2Name);

              return (
                <li key={index} className="p-4 rounded-lg flex justify-between items-center bg-onyx/50 hover:bg-onyx transition-colors">
                  <div className="flex items-center space-x-4">
                    {fighter1Id ? <Link to={`/fighters/${fighter1Id}`} className="text-2xl text-white font-bold hover:text-gold">{fighter1Name}</Link> : <span className="text-2xl text-white font-bold">{fighter1Name}</span>}
                    <span className="text-2xl text-medium-gray">vs.</span>
                    {fighter2Id ? <Link to={`/fighters/${fighter2Id}`} className="text-2xl text-white font-bold hover:text-gold">{fighter2Name}</Link> : <span className="text-2xl text-white font-bold">{fighter2Name}</span>}
                  </div>
                  <span className="text-medium-gray text-sm font-bold uppercase bg-charcoal px-3 py-1 rounded-full">{fight.weight_class}</span>
                </li>
              );
            })}
          </ul>
          <CommentList />
          <CommentForm postId={`event-${event.id}`} />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default EventDetail;
