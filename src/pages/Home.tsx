import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Fighter, Event, News } from '../types';
import FighterCard from '../components/fighters/FighterCard';
import AnimatedPage from '../components/motion/AnimatedPage';
import Spinner from '../components/ui/Spinner';

import SectionHeader from '../components/ui/SectionHeader';

const Home: React.FC = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fightersRes, eventsRes, newsRes] = await Promise.all([
          fetch('http://localhost:3001/fighters?_limit=4'),
          fetch('http://localhost:3001/events?_limit=1'),
          fetch('http://localhost:3001/news?_limit=3')
        ]);
        const fightersData = await fightersRes.json();
        const eventsData = await eventsRes.json();
        const newsData = await newsRes.json();
        setFighters(fightersData);
        setEvents(eventsData);
        setNews(newsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const featuredEvent = events[0];

  return (
    <AnimatedPage>
      <div className="space-y-24">
        {/* Featured Event */}
        {featuredEvent && (
          <section className="relative text-white">
            <div className="absolute inset-0">
              <img src={featuredEvent.image} alt={featuredEvent.name} className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-transparent"></div>
            </div>
            <div className="relative container mx-auto px-6 py-24 text-center">
              <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-widest">
                {featuredEvent.name}
              </h1>
              <p className="text-2xl md:text-4xl text-gold mt-4 font-semibold">
                {new Date(featuredEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xl md:text-2xl text-light-gray mt-2">{featuredEvent.location}</p>
              <Link to={`/events/${featuredEvent.id}`} className="mt-8 inline-block bg-gold text-charcoal font-bold py-3 px-8 rounded-lg uppercase hover:bg-white transition-colors">
                View Event
              </Link>
            </div>
          </section>
        )}

        {/* Top Fighters */}
        <section>
          <SectionHeader title="Top" accent="Fighters" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {fighters.map(fighter => (
              <FighterCard key={fighter.id} fighter={fighter} />
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section>
          <SectionHeader title="Latest" accent="News" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(article => (
              <Link to={`/news/${article.id}`} className="block bg-charcoal rounded-lg shadow-lg overflow-hidden group">
                <div className="relative">
                  <img src={article.image} alt={article.title} className="w-full h-56 object-cover"/>
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 h-20">{article.title}</h3>
                  <p className="text-medium-gray text-sm mb-4">{article.source} - {new Date(article.date).toLocaleDateString()}</p>
                  <span className="text-gold font-semibold hover:underline">Read More &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default Home;