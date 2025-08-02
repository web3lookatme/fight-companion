import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import FighterCarousel from '../components/fighters/FighterCarousel';
import AnimatedPage from '../components/motion/AnimatedPage';
import Spinner from '../components/ui/Spinner';
import SectionHeader from '../components/ui/SectionHeader';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const {
    fighters,
    events,
    news,
    fetchFighters,
    fetchEvents,
    fetchNews,
    loading,
  } = useStore();

  useEffect(() => {
    fetchFighters();
    fetchEvents();
    fetchNews();
  }, [fetchFighters, fetchEvents, fetchNews]);

  if (loading) {
    return <Spinner />;
  }

  const featuredEvent = events[0];
  const featuredFighters = fighters.slice(0, 3);

  return (
    <AnimatedPage>
      <div className="space-y-24">
        {/* Featured Event */}
        {featuredEvent && (
          <motion.section 
            className="relative text-white overflow-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="absolute inset-0"
              style={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <img src={featuredEvent.image} alt={featuredEvent.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/80 to-transparent"></div>
            </motion.div>
            <div className="relative container mx-auto px-6 py-24 text-center">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold uppercase tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {featuredEvent.name}
              </motion.h1>
              <motion.p 
                className="text-2xl md:text-4xl text-gold mt-4 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {new Date(featuredEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </motion.p>
              <motion.p 
                className="text-xl md:text-2xl text-light-gray mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                {featuredEvent.location}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                <Link to={`/events/${featuredEvent.id}`} className="mt-8 inline-block bg-gold text-charcoal font-bold py-3 px-8 rounded-lg uppercase hover:bg-white transition-colors">
                  View Event
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}

        import FighterCarousel from '../components/fighters/FighterCarousel';

// ... (imports and component start)

        {/* Featured Fighters */}
        {featuredFighters.length > 0 && (
          <section>
            <SectionHeader title="Featured" accent="Fighters" />
            <FighterCarousel fighters={featuredFighters} />
          </section>
        )}

// ... (rest of the component)

        {/* Latest News */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader title="Latest" accent="News" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {news.slice(0, 3).map(article => (
              <motion.div
                key={article.id}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link to={`/news/${article.id}`} className="block bg-charcoal rounded-lg shadow-lg overflow-hidden group h-full">
                  <div className="relative">
                    <img src={article.image} alt={article.title} className="w-full h-56 object-cover"/>
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 flex-grow">{article.title}</h3>
                    <p className="text-medium-gray text-sm mb-4">{article.source} - {new Date(article.date).toLocaleDateString()}</p>
                    <span className="text-gold font-semibold group-hover:underline">Read More &rarr;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </AnimatedPage>
  );
};

export default Home;